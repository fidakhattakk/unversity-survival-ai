from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_chacha_roast

router = APIRouter()

class RoastRequest(BaseModel):
    gpa: float
    major: str

@router.post("/")
async def get_roast(request: RoastRequest):
    """Generate a roast + recovery plan based on GPA and Major."""
    try:
        roast = await generate_chacha_roast(gpa=request.gpa, major=request.major)
        return {"gpa": request.gpa, "major": request.major, "roast": roast}
    except Exception as e:
        return {"error": str(e)}
