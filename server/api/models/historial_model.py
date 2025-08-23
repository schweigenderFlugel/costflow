from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, BOOLEAN, TIMESTAMP
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

from .indirect_cost_model import IndirectCost

class HistorialBase(SQLModel):
    date: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class Historial(HistorialBase, table=True):
    __tablename__ = 'historial'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    indirect_costs: List[IndirectCost] = Relationship(back_populates="historial")
    is_deleted: bool = Field(sa_column=Column(BOOLEAN), default=False)

class CreateHistorial(HistorialBase):
    pass

optional_fields = {Field: (Optional[typ], None) for Field, typ in CreateHistorial.__annotations__.items()}

UpdateIndirectCost= create_model(
  "UpdateIndirectCost",
  **optional_fields
)