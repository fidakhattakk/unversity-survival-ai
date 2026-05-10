"""
Bunk Calculator API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_bunk_status():
    """Calculate safe bunk count based on attendance."""
    return {"message": "Bunk calculator endpoint — coming soon 🎯"}
