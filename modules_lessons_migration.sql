-- Migration for Phase 3: Learning Management & Session Lifecycles

-- 1. Modules Table
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    video_url TEXT,
    content TEXT,
    duration TEXT, -- e.g., "12:30"
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Lesson Progress Table
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    last_watched_second INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- 4. Mentor Reviews Table
CREATE TABLE IF NOT EXISTS mentor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    learner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for Modules/Lessons (Public Read)
CREATE POLICY "Public Read Modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Public Read Lessons" ON lessons FOR SELECT USING (true);

-- Policies for Progress (User-specific)
CREATE POLICY "Users can track own progress" ON lesson_progress
    FOR ALL USING (auth.uid() = user_id);

-- Policies for Reviews (Learner Create/Read, Mentor Read)
CREATE POLICY "Learners can create reviews" ON mentor_reviews
    FOR INSERT WITH CHECK (auth.uid() = learner_id);
CREATE POLICY "Mentors and learners can read reviews" ON mentor_reviews
    FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = learner_id);

-- SEED DATA for Course 1
INSERT INTO modules (id, course_id, title, order_index) VALUES
('m1-id-placeholder', 1, 'Introduction to Full-Stack', 1),
('m2-id-placeholder', 1, 'Frontend Mastery', 2);

INSERT INTO lessons (module_id, title, video_url, duration, order_index) VALUES
('m1-id-placeholder', 'Course Overview', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '05:00', 1),
('m1-id-placeholder', 'Setting up the Environment', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '12:45', 2),
('m2-id-placeholder', 'Modern React Hooks', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '18:20', 1),
('m2-id-placeholder', 'Tailwind CSS Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '14:10', 2);
