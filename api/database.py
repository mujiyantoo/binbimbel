from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
import os
import logging
from dotenv import load_dotenv
from pathlib import Path

# --- Configuration ---
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# --- Database URL Handling ---
# Check for Supabase, standard DATABASE_URL, or Netlify's auto-generated NETLIFY_DATABASE_URL
DATABASE_URL = (
    os.environ.get("SUPABASE_DB_URL") or 
    os.environ.get("DATABASE_URL") or 
    os.environ.get("NETLIFY_DATABASE_URL")
)

if DATABASE_URL:
    # AsyncPG requires postgresql+asyncpg:// scheme
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# --- Engine Creation ---
if not DATABASE_URL:
    logger.warning("DATABASE_URL not found! Using local fallback.")
    DATABASE_URL = "sqlite+aiosqlite:///./bimbel.db"
    logger.info("Using local SQLite database: bimbel.db")
    connect_args = {}
    engine = create_async_engine(DATABASE_URL, echo=True, connect_args=connect_args)
else:
    logger.info(f"DATABASE_URL found: {DATABASE_URL[:30]}...")

    # Konfigurasi khusus untuk Supabase/Postgres dengan AsyncPG
    # Penting: Supabase Transaction Pooler (port 6543) tidak support prepared statements
    # dan environment Serverless (Vercel) sebaiknya menonaktifkan pooling client-side (NullPool)
    connect_args = {"statement_cache_size": 0}
    
    logger.info(f"Initializing DB with connect_args: {connect_args} and NullPool")
    
    engine = create_async_engine(
        DATABASE_URL, 
        echo=True,
        connect_args=connect_args,
        poolclass=NullPool
    )

# --- Session Factory ---
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# --- Base Model ---
class Base(DeclarativeBase):
    pass

# --- Lazy Initialization Logic ---
_db_initialized = False

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

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
