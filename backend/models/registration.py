from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime
import uuid


class RegistrationCreate(BaseModel):
    """Model untuk menerima data pendaftaran dari frontend"""
    # Data Calon Siswa
    nama_lengkap: str = Field(..., min_length=3, max_length=100)
    nama_panggilan: Optional[str] = Field(None, max_length=50)
    jenis_kelamin: str = Field(..., pattern="^(L|P)$")
    tempat_lahir: str = Field(..., min_length=2, max_length=100)
    tanggal_lahir: str
    asal_sekolah: str = Field(..., min_length=3, max_length=150)
    kelas: str
    alamat: str = Field(..., min_length=10, max_length=500)
    telepon: str = Field(..., min_length=10, max_length=20)
    email: Optional[EmailStr] = None
    
    # Data Orang Tua/Wali
    nama_ayah: str = Field(..., min_length=3, max_length=100)
    pekerjaan_ayah: Optional[str] = Field(None, max_length=100)
    telepon_ayah: str = Field(..., min_length=10, max_length=20)
    nama_ibu: str = Field(..., min_length=3, max_length=100)
    pekerjaan_ibu: Optional[str] = Field(None, max_length=100)
    telepon_ibu: str = Field(..., min_length=10, max_length=20)
    alamat_ortu: Optional[str] = Field(None, max_length=500)
    
    # Pilihan Program Bimbel
    program: str
    mata_pelajaran: List[str] = Field(..., min_items=1)
    hari: str
    waktu: str
    
    # Informasi Tambahan
    referensi: str
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
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
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
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


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
