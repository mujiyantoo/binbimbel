import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

# GANTI INI DENGAN PASSWORD ANDA YANG BENAR
# Format: postgresql+asyncpg://postgres.qstzwlpuideeqaxxipil:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
DATABASE_URL = "postgresql+asyncpg://postgres.qstzwlpuideeqaxxipil:hMQLkB10GSCbZrlh@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

async def test_connection():
    print(f"Testing connection to: {DATABASE_URL}")
    try:
        engine = create_async_engine(DATABASE_URL, echo=True)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Connection Successful!", result.scalar())
            
            # Coba select data
            print("Trying to fetch registrations...")
            result = await conn.execute(text("SELECT * FROM registrations LIMIT 1"))
            rows = result.fetchall()
            print(f"Fetched {len(rows)} rows.")
            
    except Exception as e:
        print("\n!!! CONNECTION ERROR !!!")
        print(e)

if __name__ == "__main__":
    asyncio.run(test_connection())
