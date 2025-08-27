from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone

from deps.db_session_dep import SessionDep

from models.auth_model import User, AssignRole, State

from utils.sendgrid_utils import send_email

def get_current_user(db: SessionDep, user_id: str):
    ignored = ['password']
    user: User = db.exec(select(User).where(User.id == user_id)).first()
    return user.model_dump(exclude=ignored)

def get_user_by_id(db: SessionDep, user_id: str):
    ignored = ['password']
    user: User = db.exec(select(User).where(User.id == user_id)).first()
    return user.model_dump(exclude=ignored)

def get_all_users(db: SessionDep):
    ignored = ['password']
    users: list[User] = db.exec(select(User)).all()
    return [user.model_dump(exclude=ignored) for user in users]

def accept_user(db: SessionDep, id: str):
    try:
        user_found = db.get(User, id)
        if user_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        variables = {"name": user_found.model_dump()['name']}

        send_email(
            email=user_found.model_dump()['email'], 
            template_file="accepted.html", 
            subject="Estado de solicitud de registro", 
            variables=variables
        )

        db.add(user_found)
        db.commit()

        user_found.sqlmodel_update({"state": State.ACCEPTED, "updated_at": datetime.now(timezone.utc)})

        return { "message": 'User successfully accepted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def reject_user(db: SessionDep, id: str):
    try:
        user_found = db.get(User, id)
        if user_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        variables = {"name": user_found.model_dump()['name']}

        send_email(
            email=user_found.model_dump()['email'], 
            template_file="rejected.html", 
            subject="Estado de solicitud de registro", 
            variables=variables
        )

        user_found.sqlmodel_update({"state": State.REJECTED, "updated_at": datetime.now(timezone.utc)})

        db.add(user_found)
        db.commit()

        return { "message": 'User successfully rejected!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def assign_role(db: SessionDep, id: str, body: AssignRole):
    try:
        user_found = db.get(User, id)
        if user_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        data = body.model_dump()
        user_found.sqlmodel_update({"role": data["role"], "updated_at": datetime.now(timezone.utc)})
        db.add(user_found)
        db.commit()
        return { "message": 'Role successfully assigned!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))