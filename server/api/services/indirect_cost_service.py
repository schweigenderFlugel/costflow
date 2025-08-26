from fastapi import HTTPException
from sqlmodel import select, extract
from datetime import datetime, timezone
from uuid import uuid4

from deps.db_session_dep import SessionDep

from models.indirect_cost_model import IndirectCost, CreateIndirectCost, UpdateIndirectCost
from models.historial_model import Historial
from schemas.pagination import Pagination

def get_indirect_cost(db: SessionDep, pagination: Pagination):
    try:
        indirect_cost: list[IndirectCost] = db.exec(select(IndirectCost).filter(IndirectCost.is_deleted == False).offset(pagination.page).limit(pagination.limit)).all()
        return [ic.model_dump() for ic in indirect_cost]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
def get_indirect_cost_by_id(db: SessionDep, id: str):
    try:
        statement = select(IndirectCost).where(IndirectCost.id == id)
        indirect_cost_found: IndirectCost = db.exec(statement=statement).first()
        if not indirect_cost_found:
            raise HTTPException(status_code=404, detail="Indirect cost not found")
        return indirect_cost_found.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
def get_current_indirect_costs(db: SessionDep):
    try:
        this_month = datetime.now().month
        this_year = datetime.now().year

        statement = select(IndirectCost).where(
            extract('month', IndirectCost.date) == this_month,
            extract('year', IndirectCost.date) == this_year
        )
        
        indirect_costs_found = db.exec(statement=statement).all()
        if not indirect_costs_found:
            raise HTTPException(status_code=404, detail="Indirect cost not found")
        return [ic.model_dump() for ic in indirect_costs_found]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_indirect_cost(db: SessionDep, body: CreateIndirectCost):
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

        indirect_cost_statement = select(IndirectCost).where(
            extract('month', IndirectCost.date) == this_month,
            extract('year', IndirectCost.date) == this_year,
            IndirectCost.type == body.type
        )

        existing_indirect_cost = db.exec(statement=indirect_cost_statement).first()
        if existing_indirect_cost:
            raise HTTPException(
                status_code=409,
                detail="Indirect cost already exists"
            )
            
        data = body.model_dump()
        indirect_cost = IndirectCost.model_validate({"historial_id": historial_id, **data})
        db.add(indirect_cost)
        db.commit()

        return {"message": "Indirect cost successfully created!"}

    except HTTPException as http_err:
        raise http_err
   
    except Exception as e:
        raise HTTPException (
            status_code=500,
            detail=e
        )

def update_indirect_cost(db: SessionDep, id: str, body: UpdateIndirectCost): # type: ignore
    try:
        this_month = datetime.now().month
        this_year = datetime.now().year

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

        indirect_cost_found = db.get(IndirectCost, id)
        data = body.model_dump(exclude_unset=True)

        if indirect_cost_found is None:
            raise HTTPException(status_code=404, detail="Indirect cost not found")

        if int(indirect_cost_found.model_dump()["date"].year) == this_year and int(indirect_cost_found.model_dump()["date"].month) == this_month:
            indirect_cost_found.sqlmodel_update({**data, "date": datetime.now(timezone.utc) })
            db.add(indirect_cost_found)
            db.commit()
        else:
            indirect_cost = IndirectCost.model_validate({**indirect_cost_found.model_dump(), **data, "historial_id": historial_id,})
            db.add(indirect_cost)
            db.commit()

        return { "message": 'Indirect cost successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def delete_indirect_cost(db: SessionDep, id: str):
    try:
        indirect_cost_found = db.get(IndirectCost, id)
        if indirect_cost_found is None:
            raise HTTPException(status_code=404, detail="indirect cost not found")
        indirect_cost_found.sqlmodel_update({ "is_deleted": True })
        db.add(indirect_cost_found)
        db.commit()

        return { "message": 'indirect cost successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)