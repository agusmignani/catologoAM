from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext

from database.database import engine, Base, SessionLocal
from routes.auth import router as auth_router
from routes.products import router as products_router
from routes.sales import router as sales_router
from routes.stock_entry import router as stock_router

# ======================
# APP
# ======================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# ROUTES
# ======================
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(products_router, prefix="/products", tags=["products"])
app.include_router(sales_router, prefix="/sales", tags=["sales"])
app.include_router(stock_router, prefix="/stock", tags=["stock"])

# ======================
# DATABASE
# ======================
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# ======================
# UPLOADS
# ======================
BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ======================
# SECURITY
# ======================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ======================
# ROOT
# ======================
@app.get("/")
def root():
    return {"status": "ok"}
