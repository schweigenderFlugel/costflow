from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel import select, extract
from datetime import datetime, timezone
from uuid import uuid4
import json

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

from models.feedstock_model import Feedstock, CreateFeedstock, UpdateFeedstock

from .historial_service import get_historial_id

def get_feedstocks(db: SessionDep, cache: CacheDep):
    try:
        this_year = datetime.now().year
        this_month = datetime.now().month
        
        cached_list = cache.get("feedstocks_list")
    
        if cached_list:
            return JSONResponse(content=json.loads(cached_list))
        
        statement = select(Feedstock).filter(Feedstock.is_deleted == False).where(
            extract('month', Feedstock.date) == this_month,
            extract('year', Feedstock.date) == this_year,
        )

        feedstocks: list[Feedstock] = db.exec(statement=statement).all()
        data = [feedstock.model_dump(exclude=["is_deleted", "historial_id"], mode="json") for feedstock in feedstocks]
        cache.set("feedstocks_list", json.dumps(data), ex=120)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_feedstock_by_id(db: SessionDep, cache: CacheDep, id: str):
    try:
        cached_item = cache.get(f"feedstock_{id}")

        if cached_item:
            return JSONResponse(content=json.loads(cached_item))
        
        feedstock_found: Feedstock = db.exec(select(Feedstock).where(Feedstock.id == id)).first()

        if not feedstock_found:
            raise HTTPException(status_code=404, detail="Feedstock not found")
        
        data = feedstock_found.model_dump(exclude=["is_deleted"], mode="json")
        cache.set(f"feedstock_{id}", json.dumps(data), ex=120)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_feedstock(db: SessionDep, cache: CacheDep, body: CreateFeedstock):
    try:
        this_year = datetime.now().year
        this_month = datetime.now().month

        historial_id = get_historial_id(db=db)

        data = body.model_dump()

        feedstock_statement = select(Feedstock).where(
            extract('month', Feedstock.date) == this_month,
            extract('year', Feedstock.date) == this_year,
            Feedstock.sku == str(data["sku"]).upper()
        )

        existing_feedstock = db.exec(statement=feedstock_statement).first()

        if existing_feedstock:
            raise HTTPException(
                status_code=409,
                detail="Feedstock already exists"
            )
        
        feedstock = Feedstock.model_validate({**data, "historial_id": historial_id, "sku": str(data["sku"]).upper()})

        db.add(feedstock)
        db.commit()

        cached_list = cache.get("feedstocks_list")

        if cached_list:
            cache.delete("feedstocks_list")

        return { "message": 'Feedstock successfully created!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_feedstock(db: SessionDep, cache: CacheDep, id: str, body: UpdateFeedstock): # type: ignore
    try:
        this_year = datetime.now().year
        this_month = datetime.now().month

        historial_id = get_historial_id(db=db)

        feedstock_found = db.get(Feedstock, id)

        if not feedstock_found:
            raise HTTPException(status_code=404, detail="Feedstock not found")
        
        data = body.model_dump(exclude_unset=True)
        sku = str(data["sku"]).upper() if data.get("sku") else feedstock_found.model_dump()['sku']

        if feedstock_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consult not found")
        
        if int(feedstock_found.model_dump()["date"].year) == this_year and int(feedstock_found.model_dump()["date"].month) == this_month:
            feedstock_found.sqlmodel_update({**feedstock_found.model_dump(), **data, "sku": sku, "date": datetime.now(timezone.utc)})
            db.add(feedstock_found)
            db.commit()
        else:
            feedstock = Feedstock.model_validate({**feedstock_found.model_dump(), **data, "historial_id": historial_id, "sku": sku, "date": datetime.now(timezone.utc)})
            db.add(feedstock)
            db.commit()

        cached_list = cache.get("feedstocks_list")

        if cached_list:
            cache.delete("feedstocks_list")

        return { "message": 'Feedstock successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_feedstock(db: SessionDep, cache: CacheDep, id: str):
    try:
        feedstock_found = db.get(Feedstock, id)
        if feedstock_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consult not found")
        feedstock_found.sqlmodel_update({ "is_deleted": True })
        db.add(feedstock_found)
        db.commit()

        cached_list = cache.get("feedstocks_list")

        if cached_list:
            cache.delete("feedstocks_list")

        return { "message": 'Feedstock successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
