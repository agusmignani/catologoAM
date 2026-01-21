from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_stock_entries():
    return []
