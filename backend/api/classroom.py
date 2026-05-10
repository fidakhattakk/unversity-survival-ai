from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.gemini_service import generate_classroom_summary

router = APIRouter()

class ClassroomSyncRequest(BaseModel):
    oauth_token: str
    assignments_raw: str

@router.post("/sync")
async def sync_classroom(request: ClassroomSyncRequest):
    """
    Pulls Google Classroom assignments, feeds them to Gemini,
    and returns a Hinglish summary and Danger Level.
    """
    try:
        # Normally: use google-api-python-client with oauth_token here
        # For now, we simulate by directly parsing assignments_raw
        result = await generate_classroom_summary(request.assignments_raw)
        return result
    except Exception as e:
        return {"error": str(e)}
