"""
Roast Engine API routes
"""

from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_chacha_roast

router = APIRouter()

class RoastRequest(BaseModel):
    gpa: float
    major: str
    issues: str = ""

@router.post("/")
async def get_roast(request: RoastRequest):
    """Generate a savage AI roast for the student."""
    try:
        roast = await generate_chacha_roast(gpa=request.gpa, major=request.major, issues=request.issues)
        return {"roast": roast}
    except Exception as e:
        return {"error": str(e)}
