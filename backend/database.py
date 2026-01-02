from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import Column, String, DateTime, JSON, Boolean
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase/Neon uses postgresql:// but asyncpg needs postgresql+asyncpg://
# Check for Supabase, standard DATABASE_URL, or Netlify's auto-generated NETLIFY_DATABASE_URL
DATABASE_URL = (
    os.environ.get("SUPABASE_DB_URL") or 
    os.environ.get("DATABASE_URL") or 
    os.environ.get("NETLIFY_DATABASE_URL")
)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Fallback for local development
if not DATABASE_URL:
    DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/bimbel_db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

class Base(DeclarativeBase):
    pass

async def get_db():
    # Lazy init tables on first request
    from server import ensure_db
    await ensure_db()
    
    async with AsyncSessionLocal() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        # Instead of create_all, we use run_sync
        await conn.run_sync(Base.metadata.create_all)
