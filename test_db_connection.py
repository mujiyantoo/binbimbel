import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

# Load env vars
load_dotenv('api/.env.test')

# Get and fix URL
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL not found in api/.env")
    exit(1)

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

print(f"🔄 Testing connection to: {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'LOCAL'}...")

async def test_connection():
    try:
        # Gunakan konfigurasi yang sama dengan production
        connect_args = {"statement_cache_size": 0}
        engine = create_async_engine(DATABASE_URL, echo=False, connect_args=connect_args)
        
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT version();"))
            version = result.scalar()
            print(f"✅ SUCCESS! Connected to: {version}")
            
            # Test writing
            print("🔄 Testing Write Permission...")
            # Create temp table check
            await conn.execute(text("CREATE TEMP TABLE IF NOT EXISTS _test_check (id serial primary key);"))
            print("✅ SUCCESS! Write permission ok.")
            
    except Exception as e:
        print(f"❌ CONNECTION FAILED: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(test_connection())
    except Exception as e:
         # Fallback for some windows environments or jupyter
        asyncio.run(test_connection())
