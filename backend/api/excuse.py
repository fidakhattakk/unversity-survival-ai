"""
Excuse Generator API routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def generate_excuse():
    """Generate a creative excuse powered by Gemini."""
    return {"message": "Excuse generator endpoint — coming soon 🤥"}
