from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import Column, String, DateTime, JSON, Boolean
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Neon uses postgresql:// but asyncpg needs postgresql+asyncpg://
# Check for standard DATABASE_URL or Netlify's auto-generated NETLIFY_DATABASE_URL
DATABASE_URL = os.environ.get("DATABASE_URL") or os.environ.get("NETLIFY_DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

import logging
logger = logging.getLogger(__name__)

# Fallback for local development
if not DATABASE_URL:
    logger.warning("DATABASE_URL not found! Using local fallback.")
    DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/bimbel_db"
    engine = create_async_engine(DATABASE_URL, echo=True)
else:
    logger.info(f"DATABASE_URL found: {DATABASE_URL[:30]}...")

    # Konfigurasi khusus untuk Supabase/Postgres dengan AsyncPG
    # Penting: Supabase Transaction Pooler (port 6543) tidak support prepared statements
    connect_args = {"statement_cache_size": 0}
    
    logger.info(f"Initializing DB with connect_args: {connect_args}")
    
    engine = create_async_engine(
        DATABASE_URL, 
        echo=True,
        connect_args=connect_args,
        pool_pre_ping=True
    )
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

class Base(DeclarativeBase):
    pass

import logging
logger = logging.getLogger(__name__)

# Flag to prevent multiple initializations
_db_initialized = False

async def ensure_db():
    global _db_initialized
    if not _db_initialized:
        try:
            await init_db()
            _db_initialized = True
        except Exception as e:
            logger.error(f"Lazy DB Init failed: {e}")

async def get_db():
    # Lazy init tables on first request
    await ensure_db()
    
    async with AsyncSessionLocal() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
