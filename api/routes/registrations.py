from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from models.registration import (
    RegistrationCreate, 
    RegistrationModel, 
    RegistrationResponse,
    RegistrationListResponse
)
from database import get_db
from typing import List
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/registrations", tags=["registrations"])


@router.post("", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
async def create_registration(registration: RegistrationCreate, db: AsyncSession = Depends(get_db)):
    """
    Endpoint untuk submit formulir pendaftaran siswa baru
    """
    try:
        # Konversi ke model SQLAlchemy
        new_reg = RegistrationModel(**registration.dict())
        
        # Simpan ke Database
        db.add(new_reg)
        await db.commit()
        await db.refresh(new_reg)
        
        logger.info(f"New registration created: {new_reg.id}")
        
        return RegistrationResponse(
            success=True,
            message="Pendaftaran berhasil! Tim kami akan segera menghubungi Anda.",
            data={
                "registration_id": new_reg.id,
                "nama_lengkap": new_reg.nama_lengkap,
                "program": new_reg.program,
                "created_at": new_reg.created_at.isoformat()
            }
        )
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error creating registration: {str(e)}")
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi."
        )


@router.get("", response_model=RegistrationListResponse)
async def get_all_registrations(
    skip: int = 0,
    limit: int = 100,
    program: str = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Endpoint untuk mengambil semua data pendaftaran
    """
    try:
        # Build query
        stmt = select(RegistrationModel)
        if program:
            stmt = stmt.where(RegistrationModel.program == program)
        
        # Sorting, pagination
        stmt = stmt.order_by(desc(RegistrationModel.created_at)).offset(skip).limit(limit)
        
        result = await db.execute(stmt)
        registrations = result.scalars().all()
        
        formatted_data = []
        for reg in registrations:
            formatted_data.append({
                "registration_id": reg.id,
                "nama_lengkap": reg.nama_lengkap,
                "program": reg.program,
                "telepon": reg.telepon,
                "kelas": reg.kelas,
                "created_at": reg.created_at.isoformat() if reg.created_at else ""
            })
        
        return RegistrationListResponse(
            success=True,
            count=len(formatted_data),
            data=formatted_data
        )
        
    except Exception as e:
        logger.error(f"Error fetching registrations: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat mengambil data"
        )


@router.get("/{registration_id}", response_model=RegistrationResponse)
async def get_registration_by_id(registration_id: str, db: AsyncSession = Depends(get_db)):
    """
    Endpoint untuk mengambil detail satu pendaftaran berdasarkan ID
    """
    try:
        stmt = select(RegistrationModel).where(RegistrationModel.id == registration_id)
        result = await db.execute(stmt)
        registration = result.scalar_one_or_none()
        
        if not registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registration not found"
            )
        
        # Convert to dict for response
        reg_dict = {
            "id": registration.id,
            "nama_lengkap": registration.nama_lengkap,
            "nama_panggilan": registration.nama_panggilan,
            "jenis_kelamin": registration.jenis_kelamin,
            "tempat_lahir": registration.tempat_lahir,
            "tanggal_lahir": registration.tanggal_lahir,
            "asal_sekolah": registration.asal_sekolah,
            "kelas": registration.kelas,
            "alamat": registration.alamat,
            "telepon": registration.telepon,
            "email": registration.email,
            "nama_ayah": registration.nama_ayah,
            "pekerjaan_ayah": registration.pekerjaan_ayah,
            "telepon_ayah": registration.telepon_ayah,
            "nama_ibu": registration.nama_ibu,
            "pekerjaan_ibu": registration.pekerjaan_ibu,
            "telepon_ibu": registration.telepon_ibu,
            "alamat_ortu": registration.alamat_ortu,
            "program": registration.program,
            "mata_pelajaran": registration.mata_pelajaran,
            "hari": registration.hari,
            "waktu": registration.waktu,
            "referensi": registration.referensi,
            "persetujuan": registration.persetujuan,
            "tanggal_daftar": registration.tanggal_daftar,
            "created_at": registration.created_at.isoformat() if registration.created_at else None,
            "updated_at": registration.updated_at.isoformat() if registration.updated_at else None
        }
        
        return RegistrationResponse(
            success=True,
            message="Data ditemukan",
            data=reg_dict
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching registration {registration_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat mengambil data"
        )


@router.get("/stats/summary")
async def get_registration_stats(db: AsyncSession = Depends(get_db)):
    """
    Endpoint untuk mendapatkan statistik pendaftaran
    """
    try:
        # Total registrations
        total_stmt = select(func.count(RegistrationModel.id))
        total_result = await db.execute(total_stmt)
        total = total_result.scalar()
        
        # Count by program
        program_stmt = select(RegistrationModel.program, func.count(RegistrationModel.id)).group_by(RegistrationModel.program)
        program_result = await db.execute(program_stmt)
        program_stats = {row[0]: row[1] for row in program_result.all()}
        
        # Count by level (Substr logic)
        # Note: SUBSTR works in most Postgres versions
        level_stmt = select(func.substr(RegistrationModel.kelas, 1, 2), func.count(RegistrationModel.id)).group_by(func.substr(RegistrationModel.kelas, 1, 2))
        level_result = await db.execute(level_stmt)
        level_stats = {row[0]: row[1] for row in level_result.all()}
        
        return {
            "success": True,
            "data": {
                "total_registrations": total,
                "by_program": program_stats,
                "by_level": level_stats
            }
        }
        
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat mengambil statistik"
        )
import pandas as pd
import io
from fastapi.responses import StreamingResponse

@router.get("/export/excel")
async def export_registrations_excel(db: AsyncSession = Depends(get_db)):
    """
    Endpoint untuk mengekspor semua data pendaftaran ke file Excel
    """
    try:
        # Ambil semua data
        stmt = select(RegistrationModel).order_by(desc(RegistrationModel.created_at))
        result = await db.execute(stmt)
        registrations = result.scalars().all()
        
        # Siapkan data untuk DataFrame
        data_list = []
        for reg in registrations:
            data_list.append({
                "ID": reg.id,
                "Nama Lengkap": reg.nama_lengkap,
                "Nama Panggilan": reg.nama_panggilan,
                "Jenis Kelamin": "Laki-laki" if reg.jenis_kelamin == 'L' else "Perempuan",
                "Tempat Lahir": reg.tempat_lahir,
                "Tanggal Lahir": reg.tanggal_lahir,
                "Asal Sekolah": reg.asal_sekolah,
                "Kelas": reg.kelas.upper() if reg.kelas else "",
                "Alamat": reg.alamat,
                "Telepon": reg.telepon,
                "Email": reg.email,
                "Nama Ayah": reg.nama_ayah,
                "Telepon Ayah": reg.telepon_ayah,
                "Nama Ibu": reg.nama_ibu,
                "Telepon Ibu": reg.telepon_ibu,
                "Program": reg.program,
                "Mata Pelajaran": ", ".join(reg.mata_pelajaran) if reg.mata_pelajaran else "",
                "Hari": reg.hari,
                "Waktu": reg.waktu,
                "Referensi": reg.referensi,
                "Tanggal Daftar": reg.tanggal_daftar,
                "Dibuat Pada": reg.created_at.strftime("%Y-%m-%d %H:%M") if reg.created_at else ""
            })
        
        if not data_list:
            # Jika data kosong, buat baris kosong dengan header
            df = pd.DataFrame(columns=[
                "ID", "Nama Lengkap", "Nama Panggilan", "Jenis Kelamin", 
                "Tempat Lahir", "Tanggal Lahir", "Asal Sekolah", "Kelas", 
                "Alamat", "Telepon", "Email", "Nama Ayah", "Telepon Ayah", 
                "Nama Ibu", "Telepon Ibu", "Program", "Mata Pelajaran", 
                "Hari", "Waktu", "Referensi", "Tanggal Daftar", "Dibuat Pada"
            ])
        else:
            df = pd.DataFrame(data_list)
        
        # Simpan ke buffer
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Pendaftaran')
        
        output.seek(0)
        
        # Return sebagai file download
        filename = f"Data_Pendaftaran_BIN_Bimbel_{datetime.now().strftime('%Y%m%d_%H%M')}.xlsx"
        
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except Exception as e:
        logger.error(f"Error exporting to Excel: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gagal mengekspor data: {str(e)}"
        )
