from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class StockEntryBase(BaseModel):
    product_id: int
    quantity: int
    cost_price: Optional[float] = None
    order_number: Optional[str] = None

class StockEntryCreate(StockEntryBase):
    pass

class StockEntryResponse(StockEntryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
