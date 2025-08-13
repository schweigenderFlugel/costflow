from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, VARCHAR,INTEGER,String,TEXT, FLOAT, BOOLEAN, TIMESTAMP
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

class MeasureUnit(str, Enum):
    GRAMS = 'GRAMS'
    CUBIC_CENTIMETERS = 'CM3'
    UNIT = 'UNIT'
    OTHERS = 'OTHERS'


class ProductBase(SQLModel):
    name: str = Field(sa_column=Column(String), description='Name of the product')
    description: Optional[str] = Field(sa_column=Column(TEXT), description='Description of the product')
    product_feedstock: uuid = Field(foreign_key="feedstocks.id", description='Related feedstock ID')
    measure_unit: MeasureUnit = Field(sa_column=Column(ENUM(MeasureUnit)), description='Unit measure for the product')
    quantity: int = Field(sa_column=Column(INTEGER), description='antity of units')
    subtotal: float = Field(sa_column=Column(FLOAT), description='subtotal cost')
    indirect_cost: float = Field(sa_column=Column(FLOAT), description='Indirect cost')
    resale_percentage: float = Field(sa_column=Column(FLOAT), description='Resale percentage')
    public_percentage: float = Field(sa_column=Column(FLOAT), description='Public sale percentage')

class Timestamp(SQLModel):
    created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  
class Product(Timestamp, ProductBase, table=True):
    __tablename__ = 'products'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

   

class CreateProduct(ProductBase):
    pass

optional_fields_product = {field: (Optional[typ], None) for field, typ in ProductBase.__annotations__.items()}

UpdateProduct = create_model(
    "UpdateProduct",
    __base__=ProductBase,
    **optional_fields_product
)