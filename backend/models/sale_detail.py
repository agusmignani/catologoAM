from sqlalchemy import Column, Integer, Float, Boolean, String, ForeignKey
from database.database import Base

class SaleDetail(Base):
    __tablename__ = "sales_details"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    cost_price = Column(Float)
    subtotal = Column(Float, nullable=False)
    sale_type = Column(String(50))
    has_packaging = Column(Boolean, default=False)
    packaging_price = Column(Float, default=0)
