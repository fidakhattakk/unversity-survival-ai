"""
Media / OCR API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def media_root():
    """Media upload and OCR endpoints."""
    return {"message": "Media/OCR endpoint — coming soon 📸"}
