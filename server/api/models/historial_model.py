from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, BOOLEAN, TIMESTAMP
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone

from .indirect_cost_model import IndirectCost
from .labour_model import Labour

class Historial(SQLModel, table=True):
    __tablename__ = 'historial'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    date: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
    indirect_costs: List[IndirectCost] = Relationship(back_populates="historial")
    labour: Optional[Labour] = Relationship(back_populates="historial")
    is_deleted: bool = Field(sa_column=Column(BOOLEAN), default=False)
