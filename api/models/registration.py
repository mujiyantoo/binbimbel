from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, String, DateTime, JSON, Boolean, Text
from database import Base


class RegistrationModel(Base):
    __tablename__ = "registrations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Data Calon Siswa
    nama_lengkap = Column(String(100), nullable=False)
    nama_panggilan = Column(String(50))
    jenis_kelamin = Column(String(1))
    tempat_lahir = Column(String(100))
    tanggal_lahir = Column(String(50))
    asal_sekolah = Column(String(150))
    kelas = Column(String(50))
    alamat = Column(Text)
    telepon = Column(String(20))
    email = Column(String(100))
    
    # Data Orang Tua/Wali
    nama_ayah = Column(String(100))
    telepon_ayah = Column(String(20))
    alamat_ortu = Column(Text)
    
    # Pilihan Program Bimbel
    program = Column(String(100))
    mata_pelajaran = Column(JSON)  # Menggunakan JSON untuk List[str]
    hari = Column(String(50))
    waktu = Column(String(50))
    
    # Informasi Tambahan
    referensi = Column(String(100))
    persetujuan = Column(Boolean, default=False)
    tanggal_daftar = Column(String(50))
    
    # Metadata
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class RegistrationCreate(BaseModel):
    """Model untuk menerima data pendaftaran dari frontend"""
    # Data Calon Siswa
    nama_lengkap: str = Field(..., min_length=3, max_length=100)
    nama_panggilan: Optional[str] = Field(None, max_length=50)
    jenis_kelamin: Optional[str] = Field(None, pattern="^(L|P)$") # Optional
    tempat_lahir: Optional[str] = Field(None, max_length=100) # Optional
    tanggal_lahir: Optional[str] = None # Optional
    asal_sekolah: Optional[str] = Field(None, max_length=150) # Optional
    kelas: str
    alamat: Optional[str] = Field(None, max_length=500) # Optional
    telepon: str = Field(..., min_length=10, max_length=20)
    email: Optional[EmailStr] = None
    
    # Data Orang Tua/Wali
    nama_ayah: Optional[str] = Field(None, max_length=100) # Optional
    telepon_ayah: Optional[str] = Field(None, max_length=20) # Optional
    alamat_ortu: Optional[str] = Field(None, max_length=500)
    
    # Pilihan Program Bimbel
    program: str
    mata_pelajaran: List[str] = Field(..., min_items=1)
    hari: str
    waktu: str
    
    # Informasi Tambahan
    referensi: Optional[str] = None # Optional
    persetujuan: bool
    tanggal_daftar: str
    
    @field_validator('persetujuan')
    @classmethod
    def validate_persetujuan(cls, v):
        if not v:
            raise ValueError('Persetujuan harus dicentang')
        return v
    
    @field_validator('mata_pelajaran')
    @classmethod
    def validate_mata_pelajaran(cls, v):
        if not v or len(v) == 0:
            raise ValueError('Minimal pilih 1 mata pelajaran')
        return v


class Registration(BaseModel):
    """Model lengkap untuk data yang tersimpan di database"""
    id: str
    
    # Data Calon Siswa
    nama_lengkap: str
    nama_panggilan: Optional[str] = None
    jenis_kelamin: str
    tempat_lahir: str
    tanggal_lahir: str
    asal_sekolah: str
    kelas: str
    alamat: str
    telepon: str
    email: Optional[str] = None
    
    # Data Orang Tua/Wali
    nama_ayah: str
    telepon_ayah: str
    alamat_ortu: Optional[str] = None
    
    # Pilihan Program Bimbel
    program: str
    mata_pelajaran: List[str]
    hari: str
    waktu: str
    
    # Informasi Tambahan
    referensi: str
    persetujuan: bool
    tanggal_daftar: str
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class RegistrationResponse(BaseModel):
    """Model untuk response API"""
    success: bool
    message: str
    data: Optional[dict] = None


class RegistrationListResponse(BaseModel):
    """Model untuk response list registrations"""
    success: bool
    count: int
    data: List[dict]
