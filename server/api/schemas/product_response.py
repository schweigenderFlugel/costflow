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
  description: str = "It schows the entire description of the product"
  measure_unit: MeasureUnit
  resale_percentage: float = 2.5
  created_at: datetime
  id: uuid
  name: str = "Product name"
  quantity: int = 20
  indirect_cost: float = 16.5
  public_percentage: float = 1.5
  updated_at: datetime
  subtotal: float
  feedstocks: List[FeedstockEntries]
