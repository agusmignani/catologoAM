from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int
    is_active: bool = True
    image_url: Optional[str] = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True