from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from models.registration import (
    RegistrationCreate, 
    Registration, 
    RegistrationResponse,
    RegistrationListResponse
)
from typing import List
import logging
from bson import ObjectId
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/registrations", tags=["registrations"])


def get_db():
    """Helper function to get database connection"""
    from server import db
    return db


@router.post("", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
async def create_registration(registration: RegistrationCreate):
    """
    Endpoint untuk submit formulir pendaftaran siswa baru
    """
    try:
        # Konversi ke model Registration dengan metadata
        registration_dict = registration.dict()
        registration_obj = Registration(**registration_dict)
        
        # Simpan ke MongoDB
        db = get_db()
        result = await db.registrations.insert_one(registration_obj.dict())
        
        logger.info(f"New registration created: {result.inserted_id}")
        
        return RegistrationResponse(
            success=True,
            message="Pendaftaran berhasil! Tim kami akan segera menghubungi Anda.",
            data={
                "registration_id": str(result.inserted_id),
                "nama_lengkap": registration.nama_lengkap,
                "program": registration.program,
                "created_at": registration_obj.created_at.isoformat()
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
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi."
        )


@router.get("", response_model=RegistrationListResponse)
async def get_all_registrations(
    skip: int = 0,
    limit: int = 100,
    program: str = None
):
    """
    Endpoint untuk mengambil semua data pendaftaran
    Query params:
    - skip: untuk pagination
    - limit: maksimal data yang diambil
    - program: filter berdasarkan program (reguler/intensif/privat)
    """
    try:
        db = get_db()
        
        # Build query
        query = {}
        if program:
            query["program"] = program
        
        # Get data dengan pagination (with projection for optimization)
        cursor = db.registrations.find(
            query,
            {
                "_id": 1,
                "nama_lengkap": 1,
                "program": 1,
                "telepon": 1,
                "kelas": 1,
                "created_at": 1
            }
        ).skip(skip).limit(limit).sort("created_at", -1)
        registrations = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string dan format data
        formatted_data = []
        for reg in registrations:
            reg["_id"] = str(reg["_id"])
            formatted_data.append({
                "registration_id": reg["_id"],
                "nama_lengkap": reg["nama_lengkap"],
                "program": reg["program"],
                "telepon": reg["telepon"],
                "kelas": reg["kelas"],
                "created_at": reg.get("created_at", "").isoformat() if isinstance(reg.get("created_at"), datetime) else reg.get("created_at", "")
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
async def get_registration_by_id(registration_id: str):
    """
    Endpoint untuk mengambil detail satu pendaftaran berdasarkan ID
    """
    try:
        db = get_db()
        
        # Cari berdasarkan ObjectId
        try:
            object_id = ObjectId(registration_id)
        except:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid registration ID format"
            )
        
        registration = await db.registrations.find_one({"_id": object_id})
        
        if not registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registration not found"
            )
        
        # Convert ObjectId to string
        registration["_id"] = str(registration["_id"])
        
        # Format datetime
        if isinstance(registration.get("created_at"), datetime):
            registration["created_at"] = registration["created_at"].isoformat()
        if isinstance(registration.get("updated_at"), datetime):
            registration["updated_at"] = registration["updated_at"].isoformat()
        
        return RegistrationResponse(
            success=True,
            message="Data ditemukan",
            data=registration
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
async def get_registration_stats():
    """
    Endpoint untuk mendapatkan statistik pendaftaran
    """
    try:
        db = get_db()
        
        # Total registrations
        total = await db.registrations.count_documents({})
        
        # Count by program
        pipeline = [
            {
                "$group": {
                    "_id": "$program",
                    "count": {"$sum": 1}
                }
            }
        ]
        program_stats = await db.registrations.aggregate(pipeline).to_list(length=10)
        
        # Count by kelas level (SD, SMP, SMA)
        pipeline_kelas = [
            {
                "$group": {
                    "_id": {
                        "$substr": ["$kelas", 0, 2]
                    },
                    "count": {"$sum": 1}
                }
            }
        ]
        kelas_stats = await db.registrations.aggregate(pipeline_kelas).to_list(length=10)
        
        return {
            "success": True,
            "data": {
                "total_registrations": total,
                "by_program": {item["_id"]: item["count"] for item in program_stats},
                "by_level": {item["_id"]: item["count"] for item in kelas_stats}
            }
        }
        
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan saat mengambil statistik"
        )
