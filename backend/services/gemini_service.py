"""
Google Gemini 1.5 Flash Service
Handles all AI text/vision/audio generation via the Gemini API.
"""

import json
import google.generativeai as genai
from core.config import settings

# Configure Gemini globally
genai.configure(api_key=settings.GEMINI_API_KEY)

CHACHA_GPT_SYSTEM_PROMPT = """You are 'Chacha GPT', an unhinged, highly critical but secretly caring desi uncle (chacha) who is an expert at roasting engineering/CS students. You use a mix of English and desi slang (like 'Bhai', 'MashAllah', 'Seedhi baat', 'beta', 'nalayaq', 'sharam kar'). Be sarcastic, dramatic, and brutally honest but ultimately addictive to talk to. Before giving brilliant academic help, you MUST roast the user."""

def get_gemini_client(system_instruction: str = None, json_mode: bool = False):
    """Initialize and return a configured Gemini model."""
    kwargs = {"model_name": "gemini-1.5-flash"}
    if system_instruction:
        kwargs["system_instruction"] = system_instruction
    if json_mode:
        kwargs["generation_config"] = {"response_mime_type": "application/json"}
    return genai.GenerativeModel(**kwargs)

async def generate_chacha_roast(cgpa: float, grades: dict) -> str:
    """Generate a savage Chacha GPT roast + recovery plan for a student based on CGPA."""
    model = get_gemini_client(system_instruction=CHACHA_GPT_SYSTEM_PROMPT)
    
    prompt = f"The student got these grades: {json.dumps(grades)}. Their calculated CGPA is {cgpa:.2f}. "
    if cgpa < 2.5:
        prompt += "This is TERRIBLE. Roast them severely (in Hinglish) for 3 sentences, then provide a strict, no-nonsense 4-week recovery plan to fix their life."
    else:
        prompt += "This is decent, but tell them not to get cocky. Roast them mildly for 2 sentences, then give them a tip to secure a 4.0."
        
    response = model.generate_content(prompt)
    return response.text

async def generate_chacha_excuse(class_name: str, reason: str) -> dict:
    """Generate a formal English excuse and an Urdu translation."""
    model = get_gemini_client(system_instruction=CHACHA_GPT_SYSTEM_PROMPT, json_mode=True)
    prompt = f"""
    The student needs an excuse for missing '{class_name}' due to: '{reason}'.
    Return a JSON object with two keys:
    "english": "A highly formal, dramatic English letter to the professor.",
    "urdu": "The exact Urdu translation of that formal letter."
    """
    response = model.generate_content(prompt)
    return json.loads(response.text)

async def generate_classroom_summary(assignments_raw: str) -> dict:
    """Generate a Hinglish summary and danger level for Google Classroom assignments."""
    model = get_gemini_client(system_instruction=CHACHA_GPT_SYSTEM_PROMPT, json_mode=True)
    prompt = f"""
    Look at these upcoming assignments:
    {assignments_raw}
    
    Return a JSON object with exactly two keys:
    "summary": "A 3-line brutal but helpful Hinglish summary starting with 'Bhai basically ye karna hai...'",
    "danger_level": "Must be exactly one of: 'Easy', 'Theek Hai', 'Allah Bachaye'"
    """
    response = model.generate_content(prompt)
    return json.loads(response.text)
