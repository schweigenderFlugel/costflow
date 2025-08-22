from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel import select
from datetime import datetime, timezone
import json

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

from models.feedstock_model import Feedstock, CreateFeedstock, UpdateFeedstock

from schemas.pagination import Pagination

def get_feedstocks(db: SessionDep, cache: CacheDep, pagination: Pagination):
    try:
        cached_list = cache.get("feedstocks_list")
    
        if cached_list:
            return JSONResponse(content=json.loads(cached_list))
        
        statement = select(Feedstock).filter(Feedstock.is_deleted == False).offset(pagination.page).limit(pagination.limit)
        feedstocks: list[Feedstock] = db.exec(statement=statement).all()
        data = [feedstock.model_dump(exclude=["is_deleted"], mode="json") for feedstock in feedstocks]
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
        
        feedstock: Feedstock = db.exec(select(Feedstock).where(Feedstock.id == id)).first()
        data = feedstock.model_dump(exclude=["is_deleted"], mode="json")
        cache.set(f"feedstock_{id}", json.dumps(data), ex=120)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_feedstock(db: SessionDep, cache: CacheDep, body: CreateFeedstock):
    try:
        data = body.model_dump()
        feedstock = Feedstock.model_validate({**data, "sku": str(data["sku"]).upper()})
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
        feedstock_found = db.get(Feedstock, id)
        data = body.model_dump(exclude_unset=True)
        sku = str(data["sku"]).upper() if data.get("sku") else feedstock_found.model_dump()['sku']
        if feedstock_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consult not found")
        feedstock_found.sqlmodel_update({**data, "sku": sku, "updated_at": datetime.now(timezone.utc)})
        db.add(feedstock_found)
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
