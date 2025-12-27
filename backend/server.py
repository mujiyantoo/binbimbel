from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# --- Konfigurasi Logging ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --- Konfigurasi Database ---
# Pastikan variable MONGO_URL dan DB_NAME ada di Railway Variables
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'bimbel_db')

if not mongo_url:
    logger.error("MONGO_URL tidak ditemukan di environment variables!")
    # Fallback agar tidak langsung crash saat build, tapi akan error saat connect
    client = None
    db = None
else:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

# --- Lifespan Manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Aplikasi dimulai...")
    yield
    if client:
        client.close()
    logger.info("Koneksi MongoDB ditutup.")

# --- Inisialisasi App ---
app = FastAPI(
    title="BIN Bimbel API", 
    version="1.0.0",
    lifespan=lifespan
)

api_router = APIRouter(prefix="/api")

# --- Models ---
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore") 
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "BIN Bimbel API - Ready"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(status_data: StatusCheckCreate): 
    status_dict = status_data.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    
    if db is not None:
        await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(skip: int = 0, limit: int = 100):
    if db is None:
        return []
    
    status_checks = await db.status_checks.find(
        {}, 
        {"_id": 0}
    ).skip(skip).limit(limit).sort("timestamp", -1).to_list(limit)
    
    return status_checks

# --- Import & Include Router Lain (Opsional) ---
try:
    from routes.registrations import router as registrations_router
    api_router.include_router(registrations_router)
except ImportError:
    pass

app.include_router(api_router)

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"], # Buka untuk semua origin sementara waktu agar tidak error CORS
    allow_methods=["*"],
    allow_headers=["*"],
)