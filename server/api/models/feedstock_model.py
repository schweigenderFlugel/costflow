from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, VARCHAR, FLOAT, BOOLEAN, TIMESTAMP
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

if TYPE_CHECKING:
  from .historial_model import Historial

class MeasureUnit(str, Enum):
    GRAMS = "GRAMS"
    KILOGRAMS = "KILOGRAMS"
    TONNES = "TONNES"
    UNITS = "UNITS"
    BOXES = "BOXES"
    METERS = "METERS"
    SQUARE_METERS = "SQUARE_METERS"
    LITERS = "LITERS"
    MILLILITERS = "MILLILITERS"
    GALLONS = "GALLONS"
    CUBIC_METERS = "CUBIC_METERS"
    LITERS_GAS = "LITERS_GAS"

class Currency(str, Enum):
    USD = 'USD'
    ARS = 'ARS'

class MatterState(str, Enum):
    SOLID = "SOLID"
    LIQUID = "LIQUID" 
    GASEOUS = "GASEOUS"

class FeedstockBase(SQLModel):
    name: str = Field(sa_column=Column(VARCHAR), description='Name of the feedstock')
    sku: str = Field(sa_column=Column(VARCHAR), description='Sku of the feedstock')
    currency: str = Field(sa_column=Column(ENUM(Currency)), description='The currency of the product: pesos, dolar')
    state: MatterState = Field(sa_column=Column(ENUM(MatterState)), description='The matter state of the feedstock')
    measure_unit: MeasureUnit = Field(sa_column=Column(ENUM(MeasureUnit)), description='Unit measure for feedstock')
    unit_cost: float = Field(sa_column=Column(FLOAT), description='The cost per unit')
    provider: Optional[str] = Field(sa_column=Column(VARCHAR), default=None, description='The provider of the feedstock')

class Timestamp(SQLModel):
    date: datetime = Field(sa_column=Column(TIMESTAMP), description='Last date of update', default_factory=lambda: datetime.now(timezone.utc))

class Feedstock(Timestamp, FeedstockBase, table=True):
    __tablename__ = 'feedstocks'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    historial_id: uuid = Field(foreign_key="historial.id", ondelete="CASCADE")
    historial: Optional["Historial"] = Relationship(back_populates="feedstocks")
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

class CreateFeedstock(FeedstockBase):
    pass

optional_fields = {field: (Optional[typ], None) for field, typ in FeedstockBase.__annotations__.items()}

UpdateFeedstock = create_model(
    "UpdateFeedstock",
    **optional_fields
)
