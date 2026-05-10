# 🔥 UETSurvival.ai

> The most unhinged, addictive, and beautiful student survival app for CS/Engineering students.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS + Framer Motion + Zustand |
| Backend | FastAPI + Supabase (PostgreSQL + Auth) |
| AI Brain | Google Gemini 1.5 Flash API (Text/Vision/Audio) |
| Deploy | Vercel (Front) + Render (Back) |

## Project Structure

```
uetsurvival-ai/
├── backend/          # FastAPI Python backend
│   ├── api/          # Route modules
│   ├── core/         # Config & security
│   ├── services/     # AI & external services
│   └── main.py       # App entrypoint
└── frontend/         # React + Vite frontend
    └── src/
        ├── components/  # Reusable UI components
        ├── features/    # Feature modules
        ├── store/       # Zustand state stores
        └── App.jsx      # Root component
```

## Getting Started

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## License

MIT
