from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from datetime import datetime
import json

from models.historial_model import Historial

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

from utils.dolar_api_utils import get_dolar_price

def get_historial(db: SessionDep, cache: CacheDep):
    try:
        cached_list = cache.get("historial")
    
        if cached_list:
            return JSONResponse(content=json.loads(cached_list))
        
        statement = select(Historial).filter(Historial.is_deleted == False)

        historial = db.exec(statement=statement).all()

        final_historial = []

        for h in historial:
            indirect_costs = []
            feedstock_costs = []
            if h.indirect_costs:
                for ic in h.indirect_costs:
                    amount = ic.model_dump(mode="json")["amount"]
                    indirect_costs.append(float(amount))
            if h.feedstocks:
                for fs in h.feedstocks:
                    dolar_datetime = datetime.fromisoformat(fs.model_dump(mode="json")["date"])
                    dolar = get_dolar_price(dolar_datetime)
                    total_amount = fs.model_dump(mode="json")["unit_cost"] * dolar["price"] if fs.currency == "USD" else fs.model_dump(mode="json")["unit_cost"]
                    feedstock_costs.append(float(total_amount))
            labour = h.labour.model_dump(mode="json", exclude=["date", "historial", "historial_id", "is_deleted"]) if h.labour else None
            services = [svc.model_dump(mode="json", exclude=["historial", "historial_id", "is_deleted", "date"]) for svc in h.indirect_costs] if h.indirect_costs else None
            feedstocks = [fs.model_dump(mode="json", exclude=["historial", "historial_id", "is_deleted", "date", "measure_unit", "provider", "sku", "state"]) for fs in h.feedstocks] if h.feedstocks else None
            final_historial.append({
                "period": datetime.fromisoformat(h.model_dump(mode="json")["date"]).strftime("%m-%Y"),
                "labour":  labour,
                "indirect_costs": {
                    "total": sum(indirect_costs), 
                    "services": services 
                },
                "feedstocks": {
                    "total": sum(feedstock_costs),
                    "feedstocks": feedstocks,
                }
            })

        cache.set("historial", json.dumps(final_historial), ex=300)
        return JSONResponse(content=final_historial)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))