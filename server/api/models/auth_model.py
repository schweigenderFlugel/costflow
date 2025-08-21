from typing import Optional
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import Column, VARCHAR, TIMESTAMP, TEXT
import sqlalchemy.dialects.postgresql as pg
from sqlmodel import SQLModel, Field

class Role(str, Enum):
  ADMIN = "ADMIN"
  EMPLOYEE = "EMPLOYEE"

class State(str, Enum):
  PENDING = "PENDING"
  REJECTED = "REJECTED"
  ACCEPTED = "ACCEPTED"

class UserBase(SQLModel):
  name: str = Field(sa_column=Column(VARCHAR), description='The name of the user')
  lastname: str = Field(sa_column=Column(VARCHAR), description='The lastname of the user')
  workstation: str = Field(sa_column=Column(VARCHAR), description='The workstation')

class UserEmail(SQLModel):
  email: str = Field(sa_column=Column(VARCHAR), description='User email')

class UserPassword(SQLModel):
  password: str = Field(sa_column=Column(VARCHAR), description='User password')

class Timestamp(SQLModel):
  created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class UserIdRole(SQLModel):
  id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
  role: Optional[Role] = Field(sa_column=Column(pg.ENUM(Role), default='EMPLOYEE'))

class User(Timestamp, UserEmail, UserBase, UserPassword, UserIdRole, table=True):
  __tablename__ = 'users'
  recovery_code: Optional[str] = Field(sa_column=Column(TEXT, nullable=True), description='Code for password recovery')
  state: Optional[State] = Field(sa_column=Column(pg.ENUM(State)), default='PENDING', description='Code for password recovery')

class PasswordRecovery(UserEmail):
  pass

class RegisterUser(UserPassword, UserEmail, UserBase):
  pass

class Login(UserPassword, UserEmail):
  pass

class ChangePassword(UserPassword):
  new_password: str = Field(sa_column=Column(VARCHAR), description='New password')