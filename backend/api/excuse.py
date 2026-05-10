"""
Excuse Generator API routes
"""

from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_chacha_excuse

router = APIRouter()

class ExcuseRequest(BaseModel):
    class_name: str
    reason: str
    strictness: str = "medium"

@router.post("/")
async def generate_excuse(request: ExcuseRequest):
    """Generate a creative excuse powered by Gemini."""
    try:
        excuse = await generate_chacha_excuse(class_name=request.class_name, reason=request.reason, strictness=request.strictness)
        return {"excuse": excuse}
    except Exception as e:
        return {"error": str(e)}
