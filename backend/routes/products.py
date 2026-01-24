import os
import shutil
from uuid import uuid4
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from database.database import get_db
from models.product import Product
from schemas.product import ProductResponse
from core.security import get_current_user
from models.user import User

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# -------------------------
# GET PUBLIC PRODUCTS
# -------------------------
@router.get("/", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return (
        db.query(Product)
        .filter(Product.is_active == True)
        .order_by(Product.created_at.desc())
        .all()
    )

# -------------------------
# GET ONE PRODUCT
# -------------------------
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.is_active == True
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return product

# -------------------------
# CREATE PRODUCT (ADMIN)
# -------------------------
@router.post("/", response_model=ProductResponse)
def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock: int = Form(...),
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    image_url = None

    if image:
        filename = f"{uuid4().hex}_{image.filename}"
        path = os.path.join(UPLOAD_DIR, filename)

        with open(path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_url = f"/uploads/{filename}"

    product = Product(
        name=name,
        description=description,
        price=price,
        stock=stock,
        is_active=is_active,
        image_url=image_url
    )

    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# -------------------------
# UPDATE PRODUCT (ADMIN)
# -------------------------
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock: int = Form(...),
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if image:
        filename = f"{uuid4().hex}_{image.filename}"
        path = os.path.join(UPLOAD_DIR, filename)

        with open(path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        product.image_url = f"/uploads/{filename}"

    product.name = name
    product.description = description
    product.price = price
    product.stock = stock
    product.is_active = is_active

    db.commit()
    db.refresh(product)
    return product

# -------------------------
# TOGGLE ACTIVE
# -------------------------
@router.patch("/{product_id}/toggle")
def toggle_product(
    product_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    product.is_active = not product.is_active
    db.commit()
    return {"status": "ok", "is_active": product.is_active}

# -------------------------
# DELETE PRODUCT
# -------------------------
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.delete(product)
    db.commit()
    return {"message": "Producto eliminado"}
