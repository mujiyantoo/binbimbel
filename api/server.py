from fastapi import FastAPI, APIRouter, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from database import init_db, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Column, String, DateTime
from database import Base

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# --- Konfigurasi Logging ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --- Models untuk Status Check ---
class StatusCheckModel(Base):
    __tablename__ = "status_checks"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String(100))
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class StatusCheck(BaseModel):
    id: str
    client_name: str
    timestamp: datetime
    class Config:
        from_attributes = True

class StatusCheckCreate(BaseModel):
    client_name: str

# Database initialization is handled lazily in database.py

# --- Inisialisasi App ---
app = FastAPI(
    title="BIN Bimbel API", 
    version="1.0.0"
)

# Health check root for direct function testing
@app.get("/")
async def root_health():
    return {"status": "ok", "engine": "FastAPI on Vercel"}

api_router = APIRouter(prefix="/api")

# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "BIN Bimbel API (Postgres) - Ready"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(status_data: StatusCheckCreate, db: AsyncSession = Depends(get_db)): 
    status_obj = StatusCheckModel(client_name=status_data.client_name)
    db.add(status_obj)
    await db.commit()
    await db.refresh(status_obj)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    stmt = select(StatusCheckModel).offset(skip).limit(limit).order_by(StatusCheckModel.timestamp.desc())
    result = await db.execute(stmt)
    return result.scalars().all()

# --- Import & Include Router Lain ---
try:
    from routes.registrations import router as registrations_router
    api_router.include_router(registrations_router)
    logger.info("Router registrasi dimuat.")
except ImportError as e:
    logger.error(f"Gagal memuat router registrasi: {e}")

app.include_router(api_router)

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)