from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, INTEGER, String, TEXT, BOOLEAN, TIMESTAMP, FLOAT
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

from .product_feedstock_model import ProductFeedstock
from .feedstock_model import Feedstock

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

class MatterState(str, Enum):
    SOLID = "SOLID"
    LIQUID = "LIQUID" 
    GASEOUS = "GASEOUS"

class ProductBase(SQLModel):
    name: str = Field(sa_column=Column(String), description='Name of the product')
    description: Optional[str] = Field(sa_column=Column(TEXT), description='Description of the product')
    sku: str = Field(sa_column=Column(String), description='Sku of the product')
    state: MatterState = Field(sa_column=Column(ENUM(MatterState)), description='The matter state of the feedstock')
    measure_unit: MeasureUnit = Field(sa_column=Column(ENUM(MeasureUnit)), description='Unit measure for the product')
    quantity: int = Field(sa_column=Column(INTEGER), description='Quantity of units')
    labour_time: int = Field(sa_column=Column(FLOAT), description='Minutes required for labour')
    
class Timestamp(SQLModel):
    created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  
class Product(Timestamp, ProductBase, table=True):
    __tablename__ = 'products'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    feedstocks: List[Feedstock] = Relationship(link_model=ProductFeedstock)
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

class ProductFeedstockInput(SQLModel):
    feedstock_id: uuid = Field(description='Related feedstock id')
    quantity_required: float = Field(sa_column=Column(FLOAT), description='The quantity required for the product')

class CreateProduct(ProductBase):
    feedstocks: List[ProductFeedstockInput]

optional_fields = {field: (Optional[typ], None) for field, typ in CreateProduct.__annotations__.items()}

UpdateProduct = create_model(
    "UpdateProduct",
    **optional_fields,
    delete_feedstocks = (Optional[List[uuid]], None)
)