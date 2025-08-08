from fastapi import HTTPException
from sqlmodel import select

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtPayload

from models.auth_model import User, RegisterUser, Login
from utils.jwt_utils import get_password_hash, verify_password, create_access_token, create_refresh_token, verify_refresh_token

def register(db: SessionDep, body: RegisterUser):
    existing_user = db.exec(select(User).where(User.email == body.email)).first()

    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered!")

    hashed = get_password_hash(body.password)
    user = User(email=body.email, password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User successfully created!"}

def login(db: SessionDep, body: Login):
    user_found: User = db.exec(select(User).where(User.email == body.email)).first()

    if not user_found or not verify_password(body.password, user_found.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = str(user_found.id)
    access_token = create_access_token(data={"sub": user_id, "role": user_found.role})
    refresh_token = create_refresh_token(data={"sub": user_id})
    return {"access_token": access_token, "refresh_token": refresh_token}

def refresh(db: SessionDep, payload: JwtPayload):
    user_found: User = db.exec(select(User.id, User.role).where(User.id == payload['sub'])).first()

    if not user_found:
        raise HTTPException(status_code=401, detail="Session not found")

    user_id = str(user_found.id)
    access_token = create_access_token(data={"sub": user_id, "role": user_found.role})
    refresh_token = create_refresh_token(data={"sub": user_id})
    return {"access_token": access_token, "refresh_token": refresh_token}