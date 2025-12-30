from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


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
    pekerjaan_ayah = Column(String(100))
    telepon_ayah = Column(String(20))
    nama_ibu = Column(String(100))
    pekerjaan_ibu = Column(String(100))
    telepon_ibu = Column(String(20))
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
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class RegistrationCreate(BaseModel):
    """Model untuk menerima data pendaftaran dari frontend"""
    # Data Calon Siswa
    nama_lengkap: str = Field(..., min_length=3, max_length=100)
    nama_panggilan: Optional[str] = Field(None, max_length=50)
    jenis_kelamin: Optional[str] = None
    tempat_lahir: Optional[str] = None
    tanggal_lahir: Optional[str] = None
    asal_sekolah: Optional[str] = None
    kelas: str
    alamat: Optional[str] = None
    telepon: str = Field(..., min_length=10, max_length=20)
    email: Optional[EmailStr] = None
    
    # Data Orang Tua/Wali (Optional now)
    nama_ayah: Optional[str] = None
    pekerjaan_ayah: Optional[str] = None
    telepon_ayah: Optional[str] = None
    nama_ibu: Optional[str] = None
    pekerjaan_ibu: Optional[str] = None
    telepon_ibu: Optional[str] = None
    alamat_ortu: Optional[str] = None
    
    # Pilihan Program Bimbel
    program: str
    mata_pelajaran: List[str] = Field(..., min_items=1)
    hari: str
    waktu: str
    
    # Informasi Tambahan
    referensi: Optional[str] = None
    persetujuan: bool = False
    tanggal_daftar: str
    



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
    pekerjaan_ayah: Optional[str] = None
    telepon_ayah: str
    nama_ibu: str
    pekerjaan_ibu: Optional[str] = None
    telepon_ibu: str
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
