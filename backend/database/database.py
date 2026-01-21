import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Obtenemos la URL de una variable de entorno (para Render) 
# o usamos la de TiDB directamente si quieres probar local.
# Nota: Cambiamos 'am' por 'test' que es donde creaste las tablas.
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://WagtENaFekUERUa.root:TU_PASSWORD@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/test")

# 2. TiDB requiere SSL. Añadimos 'ssl_verify_cert' para que sea seguro.
engine = create_engine(
    DATABASE_URL, 
    connect_args={
        "ssl": {
            "ssl_verify_cert": True,
            "ssl_verify_identity": True,
        }
    },
    echo=True
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()