from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep

from models.indirectCost_model import IndirectCost, CreateIndirectCost, UpdateIndirectCost
from schemas.pagination import Pagination

def get_indirect_cost(db: SessionDep, pagination: Pagination):
    try:
        indirectCost: list[IndirectCost] = db.exec(select(IndirectCost).filter(IndirectCost.is_deleted == False).offset(pagination.page).limit(pagination.limit)).all()
        return [ic.model_dump() for ic in indirectCost]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
    
def get_indirect_cost_by_id(db: SessionDep, id: str):
    try:
        indirectCost_found: IndirectCost = db.exec(select(IndirectCost).where(IndirectCost.id == id)).first()
        if not indirectCost_found:
            raise HTTPException(status_code=404, detail="Indirect cost not found")
        return indirectCost_found.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def create_indirectCost(db: SessionDep, body: CreateIndirectCost):
    try:
        existing_indirect_costs = db.exec(
            select(IndirectCost).where(IndirectCost.type == body.type)
        ).first()
        if existing_indirect_costs:
            raise HTTPException(
                status_code=409,
                detail="Indirect cost with this name already exists"
            )
        data = body.model_dump()
        indirectCost = IndirectCost.model_validate(data)
        db.add(indirectCost)
        db.commit()
        db.refresh(indirectCost)
        return {"message": "Indirect cost successfully created!"}

    except HTTPException as http_err:
        
        raise http_err
   
    except Exception as e:
        raise HTTPException (
            status_code=500,
            detail=e
        )
   

def update_indirectCost(db: SessionDep, id: str, body: UpdateIndirectCost): # type: ignore
    try:
        indirectCost_found = db.get(IndirectCost, id)
        data = body.model_dump(exclude_unset=True)
        if indirectCost_found is None:
            raise HTTPException(status_code=404, detail="Indirect cost not found")
        indirectCost_found.sqlmodel_update({**data, "updated_at": datetime.now(timezone.utc) })
        db.add(indirectCost_found)
        db.commit()
        db.refresh(indirectCost_found)
        return { "message": 'Indirect cost successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def delete_indirectCost(db: SessionDep, id: str):
    try:
        indirectCost_found = db.get(IndirectCost, id)
        if indirectCost_found is None:
            raise HTTPException(status_code=404, detail="indirect cost not found")
        indirectCost_found.sqlmodel_update({ "is_deleted": True })
        db.add(indirectCost_found)
        db.commit()
        db.refresh(indirectCost_found)
        return { "message": 'indirect cost successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)