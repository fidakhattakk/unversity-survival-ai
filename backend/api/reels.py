from fastapi import APIRouter

router = APIRouter()

@router.get("/feed")
async def get_reels_feed():
    """Returns a mock TikTok-style feed of study reels."""
    mock_reels = [
        {
            "id": "1",
            "title": "Data Structures in 60 Seconds",
            "category": "tip",
            "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "likes": 1204
        },
        {
            "id": "2",
            "title": "When the prof asks a question and you make eye contact",
            "category": "meme",
            "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "likes": 8450
        }
    ]
    return {"reels": mock_reels}
