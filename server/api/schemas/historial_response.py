from typing import List
from pydantic import BaseModel
from uuid import UUID as uuid

class Service(BaseModel):
    id: uuid
    amount: float = 269.6
    total_usage: float = 100.0,
    type: str = "Agua"

class Labour(BaseModel):
    id: uuid
    salary: float = 2000000.5
    hours: float = 300.0

class IndirectCosts(BaseModel):
    total: float = 628.5
    services: List[Service]

class FeedstockDetails(BaseModel):
    id: uuid
    name: str = "Azufre"
    unit_cost: float = 2000.5
    currency: str = "ARS"

class Feedstocks(BaseModel):
    total: float = 570920.5,
    feedstocks: List[FeedstockDetails]

class HistorialResponse(BaseModel):
    period: str = "07-2025"
    labour: Labour
    indirect_costs: IndirectCosts