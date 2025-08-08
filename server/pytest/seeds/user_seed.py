from sqlmodel import Session
from passlib.context import CryptContext
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from api.models.auth_model import User, Role

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_db(session: Session):
    users = [
        User(
            id=uuid4(),
            email="admintest@example.com",
            password=pwd_context.hash("fakepassword"),
            role=Role.ADMIN,
        ),
        User(
            id=uuid4(),
            email="normaltest@example.com",
            password=pwd_context.hash("fakepassword"),
            role=Role.NORMAL,
        ),
    ]
    
    session.add_all(users)
    session.commit()