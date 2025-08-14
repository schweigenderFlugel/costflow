from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep

from models.feedstock_model import Feedstock, CreateFeedstock, UpdateFeedstock

from schemas.pagination import Pagination

def get_feedstocks(db: SessionDep, pagination: Pagination):
    try:
        feedstocks: list[Feedstock] = db.exec(select(Feedstock).filter(Feedstock.is_deleted == False).offset(pagination.page).limit(pagination.limit)).all()
        return [feedstock.model_dump() for feedstock in feedstocks]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
def get_feedstock_by_id(db: SessionDep, id: str):
    try:
        feedstock: Feedstock = db.exec(select(Feedstock).where(Feedstock.id == id)).first()
        return feedstock.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def create_feedstock(db: SessionDep, body: CreateFeedstock):
    try:
        data = body.model_dump()
        feedstock = Feedstock.model_validate(data)
        db.add(feedstock)
        db.commit()
        db.refresh(feedstock)
        return { "message": 'Feedstock successfully created!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def update_feedstock(db: SessionDep, id: str, body: UpdateFeedstock): # type: ignore
    try:
        feedstock_found = db.get(Feedstock, id)
        data = body.model_dump(exclude_unset=True)
        if feedstock_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consult not found")
        feedstock_found.sqlmodel_update({**data, "updated_at": datetime.now(timezone.utc) })
        db.add(feedstock_found)
        db.commit()
        db.refresh(feedstock_found)
        return { "message": 'Feedstock successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def delete_feedstock(db: SessionDep, id: str):
    try:
        feedstock_found = db.get(Feedstock, id)
        if feedstock_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consult not found")
        feedstock_found.sqlmodel_update({ "is_deleted": True })
        db.add(feedstock_found)
        db.commit()
        db.refresh(feedstock_found)
        return { "message": 'Feedstock successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
