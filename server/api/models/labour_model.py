from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, FLOAT, BOOLEAN, TIMESTAMP
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

if TYPE_CHECKING:
  from .historial_model import Historial

class LabourBase(SQLModel):
    salary: float = Field(sa_column=Column(FLOAT), description='Salary')
    hours: float = Field(sa_column=Column(FLOAT), description='Total of hours')

class Timestamp(SQLModel):
    date: datetime = Field(sa_column=Column(TIMESTAMP), description='Last date of update', default_factory=lambda: datetime.now(timezone.utc))

class Labour(Timestamp, LabourBase, table=True):
    __tablename__ = 'labour'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    historial_id: uuid = Field(foreign_key="historial.id")
    historial: Optional["Historial"] = Relationship(back_populates="labour")
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

class CreateLabour(LabourBase):
    pass

optional_fields = {Field: (Optional[typ], None) for Field, typ in CreateLabour.__annotations__.items()}

UpdateLabour = create_model(
  "UpdateLabour",
  **optional_fields
)