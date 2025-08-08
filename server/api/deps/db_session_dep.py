from typing import Annotated
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
import os
import sys

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)

try:
    with engine.connect() as conn:
        print("INFO : Successfully connected to the PostgreSQL database.", file=sys.stdout)
except Exception as e:
    print(f"ERROR: Could not connect to the PostgreSQL database: {e}", file=sys.stderr)

@asynccontextmanager
async def create_db_and_tables(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()

SessionDep = Annotated[Session, Depends(get_session)]