"""
Reels Feed API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_reels():
    """Get survival reels/tips feed."""
    return {"message": "Reels feed endpoint — coming soon 🎬"}
