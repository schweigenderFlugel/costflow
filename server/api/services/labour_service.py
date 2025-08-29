from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select, extract
from datetime import datetime, timezone
import json

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

from models.labour_model import Labour, CreateLabour, UpdateLabour
from schemas.pagination import Pagination

from .historial_service import get_historial_id

def get_labour(db: SessionDep, pagination: Pagination):
    try:
        statement = select(Labour).filter(Labour.is_deleted == False).offset(pagination.page).limit(pagination.limit)
        labour: list[Labour] = db.exec(statement=statement).all()
        return [ic.model_dump(exclude=["is_deleted", "historial_id"]) for ic in labour]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_labour_by_id(db: SessionDep, cache: CacheDep, id: str):
    try:
        cached_item = cache.get(f"labour_{id}")

        if cached_item:
            return JSONResponse(content=json.loads(cached_item))
        statement = select(Labour).where(Labour.id == id, Labour.is_deleted == False)
        labour_found = db.exec(statement=statement).first()
        if not labour_found:
            raise HTTPException(status_code=404, detail="Labour info not found")
        data = labour_found.model_dump(mode="json", exclude=["id", "historial_id", "is_deleted"])
        cache.set(f"labour_{id}", json.dumps(data), ex=120)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_current_labour(db: SessionDep, cache: CacheDep):
    try:
        cached_item = cache.get("labour")

        if cached_item:
            return JSONResponse(content=json.loads(cached_item))

        this_month = datetime.now().month
        this_year = datetime.now().year

        statement = select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year
        )
        
        labour_found = db.exec(statement=statement).first()
        if not labour_found:
            raise HTTPException(status_code=404, detail="Labour info not found")
        data = labour_found.model_dump(mode="json", exclude=["id", "historial_id", "date", "is_deleted"])
        cache.set("labour", json.dumps(data), ex=120)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_labour(db: SessionDep, body: CreateLabour):
    try:
        this_year = datetime.now().year
        this_month = datetime.now().month

        historial_id = get_historial_id(db=db)

        labour_statement = select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year,
        )

        existing_labour = db.exec(statement=labour_statement).first()
        if existing_labour:
            raise HTTPException(
                status_code=409,
                detail="Labour info already exists"
            )
            
        data = body.model_dump()
        labour = Labour.model_validate({"historial_id": historial_id, **data})
        db.add(labour)
        db.commit()

        return {"message": "Labour info successfully created!"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException (status_code=500, detail=str(e))

def update_labour(db: SessionDep, cache: CacheDep, id: str, body: UpdateLabour): # type: ignore
    try:
        this_month = datetime.now().month
        this_year = datetime.now().year

        historial_id = get_historial_id(db=db)

        labour_found = db.get(Labour, id)
        data = body.model_dump(exclude_unset=True)

        if labour_found is None:
            raise HTTPException(status_code=404, detail="Labour info not found")

        if int(labour_found.model_dump()["date"].year) == this_year and int(labour_found.model_dump()["date"].month) == this_month:
            labour_found.sqlmodel_update({**data, "date": datetime.now(timezone.utc) })
            db.add(labour_found)
            db.commit()
        else:
            salary = str(data["salary"]) if data.get("salary") else labour_found.model_dump()['salary']
            hours = str(data["hours"]) if data.get("hours") else labour_found.model_dump()['hours']
            labour = Labour.model_validate({"historial_id": historial_id, "salary": salary, "hours": hours})
            db.add(labour)
            db.commit()

        cached_item = cache.get(f"labour_{id}")

        if cached_item:
            cache.delete(f"labour_{id}")

        return { "message": 'Labour info successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_labour(db: SessionDep, cache: CacheDep, id: str):
    try:
        labour_found = db.get(Labour, id)
        if labour_found is None:
            raise HTTPException(status_code=404, detail="Labour cost not found")
        labour_found.sqlmodel_update({ "is_deleted": True })
        db.add(labour_found)
        db.commit()

        cached_item = cache.get(f"labour_{id}")

        if cached_item:
            cache.delete(f"labour_{id}")

        return { "message": 'Labour info successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))