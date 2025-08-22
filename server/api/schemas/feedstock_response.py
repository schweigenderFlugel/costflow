from pydantic import BaseModel
from uuid import UUID as uuid
from datetime import datetime
from models.feedstock_model import Currency, MeasureUnit, MatterState

class FeedstockResponse(BaseModel):
    id: uuid
    name: str
    sku: str = "undefined",
    currency: Currency
    state: MatterState
    measure_unit: MeasureUnit
    unit_cost: float = 12300.0
    provider: str | None = "Acofar"
    created_at: datetime
    updated_at: datetime