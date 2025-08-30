from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select, extract
from datetime import datetime, timezone
from uuid import uuid4
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
            products_labour_costs = []
            product_indirect_costs = []
            if h.indirect_costs:
                for ic in h.indirect_costs:
                    amount = ic.model_dump(mode="json")["amount"]
                    indirect_costs.append(float(amount))
            if h.monthly_production:
                for mp in h.monthly_production:
                    feedstock_costs.append(float(mp.model_dump()['feedstocks_costs']))
                    products_labour_costs.append(float(mp.model_dump()['labour_costs']))
                    product_indirect_costs.append(float(mp.model_dump()['indirect_costs']))
            labour = h.labour.model_dump(mode="json", exclude=["date", "historial", "historial_id", "is_deleted"]) if h.labour else None
            services = [svc.model_dump(mode="json", exclude=["historial", "historial_id", "is_deleted", "date"]) for svc in h.indirect_costs] if h.indirect_costs else None
            feedstocks = [fs.model_dump(mode="json", exclude=["historial", "historial_id", "is_deleted", "date", "provider", "sku", "state"]) for fs in h.feedstocks] if h.feedstocks else None
            products = [prod.model_dump(mode="json", exclude=["historial_id", "is_deleted", "date"]) for prod in h.monthly_production] if h.monthly_production else None
            final_historial.append({
                "period": datetime.fromisoformat(h.model_dump(mode="json")["date"]).strftime("%m-%Y"),
                "labour":  labour,
                "monthly_production": {
                    "feedstocks_costs": round(sum(feedstock_costs), 2),
                    "labour_costs": round(sum(products_labour_costs), 2),
                    "indirect_costs": round(sum(product_indirect_costs), 2),
                    "products": products,
                },
                "indirect_costs": {
                    "total": sum(indirect_costs), 
                    "services": services 
                },
                "feedstocks": feedstocks,
                "dolar": get_dolar_price()
            })

        cache.set("historial", json.dumps(final_historial), ex=300)
        return JSONResponse(content=final_historial)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_historial_id(db: SessionDep):
    try:
        this_year = datetime.now().year
        this_month = datetime.now().month

        historial_statement = select(Historial).where(
            extract('month', Historial.date) == this_month,
            extract('year', Historial.date) == this_year
        )

        existing_historial = db.exec(statement=historial_statement).first()

        historial_id = existing_historial.model_dump()['id'] if existing_historial else uuid4()

        if not existing_historial:
            historial = Historial.model_validate({"id": historial_id, "date": datetime.now(timezone.utc) })
            db.add(historial)
            db.commit()

        return historial_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)