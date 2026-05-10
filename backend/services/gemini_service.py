"""
Google Gemini 1.5 Flash Service
Handles all AI text/vision/audio generation via the Gemini API.
"""

import google.generativeai as genai
from core.config import settings


def get_gemini_client():
    """Initialize and return a configured Gemini model."""
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    return model


async def generate_text(prompt: str, system_instruction: str = "") -> str:
    """Generate text completion from Gemini."""
    model = get_gemini_client()
    response = model.generate_content(prompt)
    return response.text


async def generate_with_image(prompt: str, image_bytes: bytes, mime_type: str = "image/png") -> str:
    """Generate text from an image + prompt (vision)."""
    model = get_gemini_client()
    response = model.generate_content([
        prompt,
        {"mime_type": mime_type, "data": image_bytes},
    ])
    return response.text
