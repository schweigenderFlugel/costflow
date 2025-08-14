from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone, timedelta
import os
import binascii

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtPayload

from models.auth_model import User, RegisterUser, Login, UserEmail, UserPassword, ChangePassword
from utils.jwt_utils import get_password_hash, verify_password, create_access_token, create_refresh_token, verify_refresh_token
from utils.encryption_utils import encrypt, decrypt
from utils.sendgrid_utils import send_email

from config.envs import FRONTEND_URL

def register(db: SessionDep, body: RegisterUser):
    try:
        existing_user = db.exec(select(User).where(User.email == body.email)).first()

        if existing_user:
            raise HTTPException(status_code=409, detail="Email already registered!")

        hashed = get_password_hash(body.password)
        user = User(email=body.email, password=hashed)

        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User successfully created!"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


def login(db: SessionDep, body: Login):
    try:
        user_found: User = db.exec(select(User).where(User.email == body.email)).first()

        if not user_found or not verify_password(body.password, user_found.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        user_id = str(user_found.id)
        access_token = create_access_token(data={"sub": user_id, "role": user_found.role})
        refresh_token = create_refresh_token(data={"sub": user_id})
        return {"access_token": access_token, "refresh_token": refresh_token}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def refresh(db: SessionDep, payload: JwtPayload):
    try:
        user_found: User = db.exec(select(User.id, User.role).where(User.id == payload['sub'])).first()

        if not user_found:
            raise HTTPException(status_code=401, detail="Session not found")

        user_id = str(user_found.id)
        access_token = create_access_token(data={"sub": user_id, "role": user_found.role})
        refresh_token = create_refresh_token(data={"sub": user_id})
        return {"access_token": access_token, "refresh_token": refresh_token}
    
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def change_password(db: SessionDep, user_id: str, body: ChangePassword):
    try:
        user_found: User = db.exec(select(User).where(User.id == user_id)).first()

        if not user_found:
            raise HTTPException(status_code=404, detail="User not found")

        hashed = get_password_hash(body.new_password)

        user_found.sqlmodel_update({"password": hashed })

        db.add(user_found)
        db.commit()
        db.refresh(user_found)
    
        return { "message": "Passoword successfully changed!" }
    
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def recover_password(db: SessionDep, body: UserEmail):
    try:
        user_found = db.exec(select(User).where(User.email == body.email)).first()

        if not user_found:
            raise HTTPException(status_code=404, detail="User not found")
    
        raw_code = binascii.hexlify(os.urandom(12)).decode()

        user_found.sqlmodel_update({"recovery_code": raw_code })

        expiration = int((datetime.now(timezone.utc) + timedelta(minutes=15)).timestamp())
        text = f"{raw_code}.{str(expiration)}"
        recovery_code_dict = encrypt(text)
        recovery_code =  ".".join(str(v) for v in recovery_code_dict.values())
        link = f"{FRONTEND_URL}/reset-password?code={recovery_code}"
        print(link)
        # mail = send_email(email=body.email, subject="Recuperaciòn de contraseña", content=link)

        db.add(user_found)
        db.commit()
        db.refresh(user_found)

        return {"message": "Email successfully sent"}
    
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def reset_password(db: SessionDep, encrypted_code: str, body: UserPassword):
    try:
        iv, encryptedData, authTag = encrypted_code.split('.')
        code, exp = decrypt({ "iv": iv, "encryptedData": encryptedData, "authTag": authTag })
        is_valid = int(exp) > int(datetime.now(timezone.utc).timestamp())

        if is_valid is not True:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid reset password code")
    
        user_found = db.exec(select(User).where(User.recovery_code == code)).first()

        if not user_found:
            raise HTTPException(status_code=404, detail="User not found")
    
        hashed = get_password_hash(body.password)
    
        user_found.sqlmodel_update({"recovery_code": None, "password": hashed})

        db.add(user_found)
        db.commit()
        db.refresh(user_found)

        return { "message": "Passoword successfully reset!" }
    
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)