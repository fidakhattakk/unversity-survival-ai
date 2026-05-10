from typing import Dict
from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_chacha_roast

router = APIRouter()

class RoastRequest(BaseModel):
    grades: Dict[str, str]

def calculate_cgpa(grades: Dict[str, str]) -> float:
    grade_points = {
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "F": 0.0
    }
    total_points = sum(grade_points.get(grade.upper(), 0.0) for grade in grades.values())
    return total_points / len(grades) if grades else 0.0

@router.post("/")
async def get_roast(request: RoastRequest):
    """Takes grades, calculates CGPA, and generates a roast + recovery plan."""
    try:
        cgpa = calculate_cgpa(request.grades)
        roast = await generate_chacha_roast(cgpa=cgpa, grades=request.grades)
        return {"cgpa": round(cgpa, 2), "roast": roast}
    except Exception as e:
        return {"error": str(e)}
