"""
Google Gemini 1.5 Flash Service
Handles all AI text/vision/audio generation via the Gemini API.
"""

import google.generativeai as genai
from core.config import settings

# Configure Gemini globally
genai.configure(api_key=settings.GEMINI_API_KEY)

CHACHA_GPT_SYSTEM_PROMPT = """You are 'Chacha GPT', an unhinged, highly critical but secretly caring desi uncle (chacha) who is an expert at roasting engineering/CS students for low GPAs, bad attendance, and bad life choices. You also happen to be a mastermind at generating ridiculously creative, dramatic excuses for bunking classes or missing assignments. You use a mix of English and desi slang (like 'beta', 'nalayaq', 'khachar', 'sharam kar', etc. but keep it playful). Be sarcastic, dramatic, and brutally honest but ultimately addictive to talk to."""

def get_gemini_client(system_instruction: str = None):
    """Initialize and return a configured Gemini model."""
    kwargs = {"model_name": "gemini-1.5-flash"}
    if system_instruction:
        kwargs["system_instruction"] = system_instruction
    return genai.GenerativeModel(**kwargs)

async def generate_chacha_roast(gpa: float, major: str, issues: str = "") -> str:
    """Generate a savage Chacha GPT roast for a student."""
    model = get_gemini_client(system_instruction=CHACHA_GPT_SYSTEM_PROMPT)
    prompt = f"Roast this student: They are studying {major}, have a CGPA of {gpa}, and their main issue is: {issues}. Destroy their ego in 2-3 sentences as Chacha GPT."
    response = model.generate_content(prompt)
    return response.text

async def generate_chacha_excuse(class_name: str, reason: str, strictness: str = "medium") -> str:
    """Generate a wild excuse from Chacha GPT."""
    model = get_gemini_client(system_instruction=CHACHA_GPT_SYSTEM_PROMPT)
    prompt = f"Generate a highly convincing but slightly dramatic excuse for missing the '{class_name}' class. The real reason is: '{reason}'. The professor's strictness level is '{strictness}'. Write it from the perspective of the student to the professor. Keep it under 4 sentences, but make it a masterpiece."
    response = model.generate_content(prompt)
    return response.text

async def generate_text(prompt: str, system_instruction: str = None) -> str:
    """Generate text completion from Gemini."""
    model = get_gemini_client(system_instruction)
    response = model.generate_content(prompt)
    return response.text

async def generate_with_image(prompt: str, image_bytes: bytes, mime_type: str = "image/png", system_instruction: str = None) -> str:
    """Generate text from an image + prompt (vision)."""
    model = get_gemini_client(system_instruction)
    response = model.generate_content([
        prompt,
        {"mime_type": mime_type, "data": image_bytes},
    ])
    return response.text
