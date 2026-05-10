from fastapi import APIRouter, UploadFile, File
import base64
from pydantic import BaseModel
from backend.services.gemini_service import generate_vision_scan, generate_audio_reply

router = APIRouter()

class VisionRequest(BaseModel):
    image_base64: str

@router.post("/vision/scan")
async def scan_image(request: VisionRequest):
    """Takes base64 image, extracts text, and generates exam questions."""
    try:
        # Strip header if present e.g. data:image/jpeg;base64,...
        data = request.image_base64
        if "," in data:
            data = data.split(",")[1]
            
        image_bytes = base64.b64decode(data)
        result = await generate_vision_scan(image_bytes)
        return result
    except Exception as e:
        return {"error": str(e)}

@router.post("/voice/process")
async def process_voice(file: UploadFile = File(...)):
    """Takes an audio file, transcribes, and returns Chacha's Hinglish reply."""
    try:
        audio_bytes = await file.read()
        mime_type = file.content_type or "audio/wav"
        reply = await generate_audio_reply(audio_bytes, mime_type)
        return {"reply": reply}
    except Exception as e:
        return {"error": str(e)}
