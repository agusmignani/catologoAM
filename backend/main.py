import sys
import path
import os

# Esto obliga a Python a mirar dentro de la carpeta donde está el archivo
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database.database import engine, Base, SessionLocal
from routes.auth import router as auth_router
from routes.products import router as products_router
from routes.sales import router as sales_router
from routes.stock_entry import router as stock_router

from passlib.context import CryptContext

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(products_router, prefix="/products", tags=["products"])
app.include_router(sales_router, prefix="/sales", tags=["sales"])
app.include_router(stock_router, prefix="/stock", tags=["stock"])

Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"status": "ok"}
