from fastapi import HTTPException
from sqlmodel import select, extract
from datetime import datetime, timezone
from uuid import uuid4

from deps.db_session_dep import SessionDep

from models.labour_model import Labour, CreateLabour, UpdateLabour
from models.historial_model import Historial

def get_labour(db: SessionDep):
    try:
        statement = select(Labour).filter(Labour.is_deleted == False)
        labour: list[Labour] = db.exec(statement=statement).all()
        return [ic.model_dump() for ic in labour]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_labour_by_id(db: SessionDep, id: str):
    try:
        statement = select(Labour).where(Labour.id == id)
        labour_found: Labour = db.exec().first(statement=statement)
        if not labour_found:
            raise HTTPException(status_code=404, detail="Labour info not found")
        return labour_found.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

def get_current_labour(db: SessionDep):
    try:
        this_month = datetime.now().month
        this_year = datetime.now().year

        statement = select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year
        )
        
        labour_found: Labour = db.exec(statement=statement).first()
        if not labour_found:
            raise HTTPException(status_code=404, detail="Labour info not found")
        return labour_found.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_labour(db: SessionDep, body: CreateLabour):
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

        labour_statement = select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year,
        )

        existing_indirect_costs = db.exec(statement=labour_statement).first()
        if existing_indirect_costs:
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

def update_labour(db: SessionDep, id: str, body: UpdateLabour): # type: ignore
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

        labour_found = db.get(Labour, id)
        data = body.model_dump(exclude_unset=True)

        if labour_found is None:
            raise HTTPException(status_code=404, detail="Labour info not found")

        if int(labour_found.model_dump()["date"].year) == this_year and int(labour_found.model_dump()["date"]) == this_month:
            labour_found.sqlmodel_update({**data, "date": datetime.now(timezone.utc) })
            db.add(labour_found)
            db.commit()
        else:
            salary = str(data["salary"]) if data.get("salary") else labour_found.model_dump()['salary']
            hours = str(data["hours"]) if data.get("hours") else labour_found.model_dump()['hours']
            labour = Labour.model_validate({"historial_id": historial_id, "salary": salary, "hours": hours})
            db.add(labour)
            db.commit()

        return { "message": 'Labour info successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_labour(db: SessionDep, id: str):
    try:
        labour_found = db.get(Labour, id)
        if labour_found is None:
            raise HTTPException(status_code=404, detail="Labour cost not found")
        labour_found.sqlmodel_update({ "is_deleted": True })
        db.add(labour_found)
        db.commit()

        return { "message": 'Labour info successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))