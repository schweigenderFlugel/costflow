from pydantic import BaseModel
from datetime import datetime
from uuid import UUID as uuid
from typing import List

from models.product_model import MeasureUnit
from models.feedstock_model import Currency

class FeedstockEntries(BaseModel):
  currency: Currency
  measure_unit: MeasureUnit
  name: str = "Feedstock name"
  unit_cost: float = 12300.5
  id: uuid
  quantity_required: float = 23.6

class ProductResponse(BaseModel):
  id: uuid
  name: str = "Product name"
  sku: str
  description: str = "It schows the entire description of the product"
  measure_unit: MeasureUnit
  quantity: int = 20
  subtotal: float
  created_at: datetime
  updated_at: datetime
  feedstocks: List[FeedstockEntries]
