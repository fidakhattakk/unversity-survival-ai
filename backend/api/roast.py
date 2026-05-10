"""
Roast Engine API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_roast():
    """Generate a savage AI roast for the student."""
    return {"message": "Roast engine endpoint — coming soon 🔥"}
