from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from datetime import datetime
import json

from models.historial_model import Historial

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

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
            if h.indirect_costs:
                for ic in h.indirect_costs:
                    amount = ic.model_dump(mode="json")["amount"]
                    indirect_costs.append(float(amount))
            labour = h.labour.model_dump(mode="json", exclude=["date", "historial", "historial_id", "is_deleted"]) if h.labour else None
            services = [svc.model_dump(mode="json", exclude=["historial", "historial_id", "is_deleted", "date"]) for svc in h.indirect_costs] if h.indirect_costs else None
            final_historial.append({
                "period": datetime.fromisoformat(h.model_dump(mode="json")["date"]).strftime("%m-%Y"),
                "labour":  labour,
                "indirect_costs": {
                    "total": sum(indirect_costs), 
                    "services": services 
                }
            })

        cache.set("historial", json.dumps(final_historial), ex=300)
        return JSONResponse(content=final_historial)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))