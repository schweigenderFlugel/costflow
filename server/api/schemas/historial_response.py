from typing import List
from pydantic import BaseModel
from uuid import UUID as uuid

class Service(BaseModel):
    id: uuid
    amount: float = 269.6
    total_usage: float = 100.0
    type: str = "Agua"

class Labour(BaseModel):
    id: uuid
    salary: float = 2000000.5
    hours: float = 300.0

class IndirectCosts(BaseModel):
    total: float = 628.5
    services: List[Service]

class Feedstock(BaseModel):
    id: uuid
    name: str = "Azufre"
    unit_cost: float = 2000.5
    currency: str = "ARS"
    measure_unit: str = "KILOGRAMS"

class Product(BaseModel):
    id: uuid
    feedstocks_costs: float = 578723.0
    product_name: str = "Detergente"
    labour_costs: float = 28571.44
    measure_unit: str = "LITERS"
    indirect_costs: float = 11.952
    quantity: int = 0

class MonthlyProduction(BaseModel):
    feedstocks_costs: float = 14291564.0
    labour_costs: float = 61000.04
    indirect_costs: float = 75866.87
    products: List[Product]

class HistorialResponse(BaseModel):
    period: str = "07-2025"
    labour: Labour
    monthly_production: MonthlyProduction
    indirect_costs: IndirectCosts
    feedstocks: List[Feedstock]