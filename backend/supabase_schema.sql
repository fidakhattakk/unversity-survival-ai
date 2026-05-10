-- UETSurvival.ai Chaos Backend Schema
-- Run this in Supabase SQL Editor

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    google_id TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    cgpa NUMERIC(3, 2),
    major TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignments table
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    title TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    danger_level TEXT CHECK (danger_level IN ('Easy', 'Theek Hai', 'Allah Bachaye')),
    chacha_summary TEXT,
    google_classroom_id TEXT UNIQUE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Streaks (XP & Gamification)
CREATE TABLE study_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    xp_points INT DEFAULT 0,
    last_study_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reels (Survival Feed)
CREATE TABLE reels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    category TEXT CHECK (category IN ('roast', 'tip', 'meme', 'hack')),
    likes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
