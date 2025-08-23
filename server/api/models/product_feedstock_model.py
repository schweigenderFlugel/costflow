from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, Float, UUID
from uuid import UUID as uuid, uuid4

class ProductFeedstockBase(SQLModel):
    feedstock_id: uuid = Field(sa_column=Column(UUID, ForeignKey('feedstocks.id')), description='The feedstock id')
    product_id: uuid = Field(sa_column=Column(UUID, ForeignKey('products.id')), description='The product id')
    quantity_required: float = Field(sa_column=Column(Float), description='The quantity required for the product')

class ProductFeedstock(ProductFeedstockBase, table=True):
    __tablename__ = "product_feedstock"
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)