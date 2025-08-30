from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ForeignKey, INT, UUID
from uuid import UUID as uuid, uuid4

class ProductIndirectCostsBase(SQLModel):
    indirect_cost_id: uuid = Field(sa_column=Column(UUID, ForeignKey('indirect_costs.id')), description='The indirect cost id')
    product_id: uuid = Field(sa_column=Column(UUID, ForeignKey('products.id')), description='The product id')
    usage: int = Field(sa_column=Column(INT), description='Usage of the service')

class ProductIndirectCost(ProductIndirectCostsBase, table=True):
    __tablename__ = "product_indirect_costs"
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)