from typing import List
from pydantic import BaseModel
from uuid import UUID as uuid

class Service(BaseModel):
    id: uuid
    amount: float = 269.6
    type: str = "Agua"

class Labour(BaseModel):
    id: uuid
    salary: float = 2000000.5
    hours: float = 300.0

class IndirectCosts(BaseModel):
    total: float = 628.5
    services: List[Service]

class HistorialResponse(BaseModel):
    period: str = "07-2025"
    labour: Labour
    indirect_costs: IndirectCosts