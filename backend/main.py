"""
🔥 UETSurvival.ai — FastAPI Backend Entrypoint
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings

app = FastAPI(
    title="UETSurvival.ai API",
    description="Backend brain for the most unhinged student survival app",
    version="0.1.0",
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "alive", "app": "UETSurvival.ai", "version": "0.1.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}


# ── Route registration (will be wired up as features are built) ──
from api import bunk, roast, excuse, classroom, reels, media
# app.include_router(bunk.router, prefix="/api/bunk", tags=["Bunk Calculator"])
app.include_router(roast.router, prefix="/api/roast", tags=["Roast Engine"])
app.include_router(excuse.router, prefix="/api/excuse", tags=["Excuse Generator"])
# app.include_router(classroom.router, prefix="/api/classroom", tags=["Classroom"])
# app.include_router(reels.router, prefix="/api/reels", tags=["Reels Feed"])
# app.include_router(media.router, prefix="/api/media", tags=["Media/OCR"])
