from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import Column, String, DateTime, JSON, Boolean
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Use local SQLite database for development
import logging
logger = logging.getLogger(__name__)

# Check if DATABASE_URL is set for production (Vercel/Netlify)
DATABASE_URL = os.environ.get("DATABASE_URL") or os.environ.get("NETLIFY_DATABASE_URL")

if DATABASE_URL:
    # Production: Use Postgres/Neon with asyncpg
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    logger.info(f"Using remote DATABASE_URL: {DATABASE_URL[:30]}...")
    # Disable prepared statements for Supabase Transaction Pooler (port 6543)
    connect_args = {"statement_cache_size": 0}
else:
    # Local development: Use SQLite
    DATABASE_URL = "sqlite+aiosqlite:///./bimbel.db"
    logger.info("Using local SQLite database: bimbel.db")
    connect_args = {}

engine = create_async_engine(DATABASE_URL, echo=True, connect_args=connect_args)
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
            # Only run init_db (create tables) for local SQLite.
            # IN PRODUCTION (Supabase), we assume tables exist to avoid "Lazy DB Init failed"
            # caused by restricted permissions or driver issues during startup.
            if "sqlite" in str(engine.url):
                await init_db()
                logger.info("Local DB initialized (tables created).")
            else:
                logger.info("Production DB detected: Skipping table creation (assuming tables exist).")
                
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
