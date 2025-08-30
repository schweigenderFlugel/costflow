from typing import Optional
from pydantic import BaseModel

class Pagination(BaseModel):
    page: Optional[int] = None
    limit: Optional[int] = None