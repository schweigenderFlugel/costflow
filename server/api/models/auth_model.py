from typing import Optional
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import Column, VARCHAR, TIMESTAMP
import sqlalchemy.dialects.postgresql as pg
from sqlmodel import SQLModel, Field

class Role(str, Enum):
  ADMIN = "ADMIN"
  EMPLOYEE = "EMPLOYEE"
  CLIENT = "CLIENT"

class UserBase(SQLModel):
  email: str = Field(sa_column=Column(VARCHAR), description='User email')
  password: str = Field(sa_column=Column(VARCHAR), description='User email')

class Timestamp(SQLModel):
  created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class UserIdRole(SQLModel):
  id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
  role: Optional[Role] = Field(sa_column=Column(pg.ENUM(Role)))

class User(Timestamp, UserBase, UserIdRole, table=True):
  __tablename__ = 'users'

class RegisterUser(UserBase):
  pass

class Login(UserBase):
  pass