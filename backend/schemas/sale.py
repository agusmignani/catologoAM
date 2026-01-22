from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# -------- Sale --------

class SaleBase(BaseModel):
    total: float
    payment_method: Optional[str] = None

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# -------- Sale Detail --------

class SaleDetailBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    cost_price: Optional[float] = None
    subtotal: float
    sale_type: Optional[str] = None
    has_packaging: bool = False
    packaging_price: float = 0

class SaleDetailCreate(SaleDetailBase):
    pass

class SaleDetailResponse(SaleDetailBase):
    id: int
    sale_id: int

    class Config:
        from_attributes = True
