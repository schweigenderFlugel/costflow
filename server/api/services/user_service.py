from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep

from models.auth_model import User, State

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

def enable_user(db: SessionDep, id: str):
    try:
        user_found = db.get(User, id)
        if user_found is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        user_found.sqlmodel_update({"state": State.ACCEPTED, "updated_at": datetime.now(timezone.utc)})
        db.add(user_found)
        db.commit()
        return { "message": 'User successfully enabled!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)