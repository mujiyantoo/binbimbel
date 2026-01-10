from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase
from database import Base

class RegistrationModel(Base):
    __tablename__ = "registrations"

    # Explicitly use UUID type to match Supabase schema
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    nama_lengkap = Column(String(255), nullable=False)
    kelas = Column(String(50), nullable=False)
    telepon = Column(String(50), nullable=False)
    program = Column(String(100), nullable=False)
    mata_pelajaran = Column(JSON)  # Stores array of strings -> mapped to JSONB in Postgres usually
    hari = Column(String(50))
    waktu = Column(String(50))
    
    # Ensure timezone awareness matches the DB "TIMESTAMP WITH TIME ZONE"
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class RegistrationCreate(BaseModel):
    """Model untuk menerima data pendaftaran dari frontend"""
    nama_lengkap: str = Field(..., min_length=3, max_length=255)
    kelas: str
    telepon: str = Field(..., min_length=10, max_length=50)
    program: str
    mata_pelajaran: List[str] = Field(default_factory=list)
    hari: str
    waktu: str


class Registration(BaseModel):
    """Model lengkap untuk response"""
    id: str
    nama_lengkap: str
    kelas: str
    telepon: str
    program: str
    mata_pelajaran: Optional[List[str]] = None
    hari: Optional[str] = None
    waktu: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class RegistrationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


class RegistrationListResponse(BaseModel):
    success: bool
    count: int
    data: List[dict]
