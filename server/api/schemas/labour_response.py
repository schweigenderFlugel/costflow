from pydantic import BaseModel
from uuid import UUID as uuid
from datetime import datetime

class CurrentLabour(BaseModel):
    salary: float = 2000000.5
    hours: float = 300.0

class Labour(BaseModel):
    salary: float = 2000000.5
    hours: float = 300.0
    date: datetime

class LabourList(BaseModel):
    id: uuid
    salary: float = 2000000.5
    hours: float = 300.0
    date: datetime
