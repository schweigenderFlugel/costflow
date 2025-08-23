from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String, FLOAT, BOOLEAN, TIMESTAMP
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

if TYPE_CHECKING:
  from .historial_model import Historial

class IndirectCostBase(SQLModel):
    amount: float = Field(sa_column=Column(FLOAT), description='Amount')
    type: str = Field(sa_column=Column(String), description='Type indirect cost')

class Timestamp(SQLModel):
    date: datetime = Field(sa_column=Column(TIMESTAMP), description='Last date of update', default_factory=lambda: datetime.now(timezone.utc))

class IndirectCost(Timestamp, IndirectCostBase, table=True):
    __tablename__ = 'indirect-costs'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    historial_id: uuid = Field(foreign_key="historial.id")
    historial: Optional["Historial"] = Relationship(back_populates="indirect_costs")
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

class CreateIndirectCost(IndirectCostBase):
    pass

optional_fields = {Field: (Optional[typ], None) for Field, typ in IndirectCostBase.__annotations__.items()}

UpdateIndirectCost =create_model(
  "UpdateIndirectCost",
  **optional_fields
)