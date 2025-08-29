from pydantic import BaseModel
from uuid import UUID as uuid
from datetime import datetime

class CurrentIndirectCosts(BaseModel):
    id: uuid
    type: str = "Electricidad"
    total_usage: float | None = 100.0
    amount: float = 166.0

class IndirectCost(BaseModel):
    type: str = "Electricidad"
    total_usage: float | None = 100.0
    amount: float = 166.0
    date: datetime

class IndirectCostsList(BaseModel):
    id: uuid
    type: str = "Electricidad"
    total_usage: float | None = 100.0
    amount: float = 166.0
    date: datetime
