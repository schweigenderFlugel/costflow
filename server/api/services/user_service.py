from sqlmodel import select
from sqlalchemy.orm import load_only

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep

from models.auth_model import User

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