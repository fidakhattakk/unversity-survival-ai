"""
Classroom API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_classroom():
    """Classroom-related endpoints."""
    return {"message": "Classroom endpoint — coming soon 🏫"}
