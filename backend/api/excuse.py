from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_chacha_excuse

router = APIRouter()

class ExcuseRequest(BaseModel):
    class_name: str
    reason: str

@router.post("/")
async def generate_excuse(request: ExcuseRequest):
    """Generate a formal English excuse and an Urdu translation."""
    try:
        excuse_data = await generate_chacha_excuse(class_name=request.class_name, reason=request.reason)
        return excuse_data
    except Exception as e:
        return {"error": str(e)}
