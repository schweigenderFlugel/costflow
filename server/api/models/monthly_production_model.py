from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, BOOLEAN, String, FLOAT, TIMESTAMP, INTEGER, VARCHAR
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone

if TYPE_CHECKING:
  from .historial_model import Historial

class MonthlyProduction(SQLModel, table=True):
    __tablename__ = 'monthly_production'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    product_name: str =  Field(sa_column=Column(String), description='Name of the product')
    feedstocks_costs: float = Field(sa_column=Column(FLOAT), description="Total amount for feedstocks")
    indirect_costs: float = Field(sa_column=Column(FLOAT), description="Total amount for indirect costs") 
    labour_costs: float = Field(sa_column=Column(FLOAT), description="Total amount for labour")
    quantity: int = Field(sa_column=Column(INTEGER), description='Quantity of units')
    measure_unit: str = Field(sa_column=Column(VARCHAR), description='Unit measure for the product')
    historial_id: uuid = Field(foreign_key="historial.id", ondelete="CASCADE")
    historial: Optional["Historial"] = Relationship(back_populates="monthly_production")
    date: datetime = Field(sa_column=Column(TIMESTAMP), description='Last date of update', default_factory=lambda: datetime.now(timezone.utc))
    is_deleted: bool = Field(sa_column=Column(BOOLEAN), default=False)
