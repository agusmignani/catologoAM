from sqlalchemy import Column, Integer, Float, DateTime, String, ForeignKey
from datetime import datetime
from database.database import Base

class StockEntry(Base):
    __tablename__ = "stock_entries"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    cost_price = Column(Float)
    order_number = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
