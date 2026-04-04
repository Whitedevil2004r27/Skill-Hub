-- 1. Create Tables
-- Profiles table with all SkillHub fields
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid UNIQUE NOT NULL,
    display_name text,
    avatar_url text,
    role text CHECK (role IN ('learner', 'mentor', 'both')),
    title text,
    company text,
    bio text,
    location text,
    rating numeric DEFAULT 0,
    reviews integer DEFAULT 0,
    skills text[],
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Courses table for the main catalog
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    instructor text NOT NULL,
    description text,
    price text,
    duration text,
    level text,
    rating numeric,
    students integer,
    category text,
    image text,
    created_at timestamptz DEFAULT now()
);

-- 2. Enable Security & Policies
-- This ensures the website can fetch the list for all visitors
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public Profiles Read" ON public.profiles;
    CREATE POLICY "Public Profiles Read" ON public.profiles FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public Courses Read" ON public.courses;
    CREATE POLICY "Public Courses Read" ON public.courses FOR SELECT USING (true);
END $$;

-- 3. Restore Jerry (Mentor)
INSERT INTO public.profiles (id, user_id, display_name, avatar_url, role, title, bio, skills, rating, reviews)
VALUES (
  'aef3ff01-41d2-4da5-b080-33fee8c869c7', 
  '94ee61ee-8b01-40d7-9554-6af8a3f45fc5', 
  'Jerry', 
  'https://lh3.googleusercontent.com/a/ACg8ocIG6cn2HHFISqQ4uzSKy36QDMguoaFQcEreuO7Y3Rnp0V7Fex7K=s96-c', 
  'mentor', 
  'Senior Full Stack Developer', 
  'Passionate about mentoring new developers and building scalable web applications.', 
  ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript'], 
  4.9, 
  24
)
ON CONFLICT (id) DO UPDATE SET 
    role = 'mentor', 
    title = EXCLUDED.title, 
    bio = EXCLUDED.bio, 
    skills = EXCLUDED.skills,
    updated_at = now();

-- 4. Restore Course Catalog
DELETE FROM public.courses; -- Clear old data to avoid duplicates

INSERT INTO public.courses (title, instructor, description, price, duration, level, rating, students, category, image)
VALUES 
('Full-Stack Web Development', 'Sarah Johnson', 'Master modern web development from frontend to backend.', '$89.99', '24 hours', 'Intermediate', 4.8, 1200, 'Development', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),
('UI/UX Design Masterclass', 'Marcus Chen', 'Learn the principles of beautiful and functional design.', '$74.99', '16 hours', 'Beginner', 4.9, 850, 'Design', 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c'),
('Data Science Fundamentals', 'Dr. Emily White', 'Introduction to data analysis, visualization, and machine learning.', '$99.99', '32 hours', 'Beginner', 4.7, 2100, 'Data Science', 'https://images.unsplash.com/photo-1551288049-bbda0231f14a'),
('Digital Marketing Strategy', 'Alex Rivera', 'Build effective marketing campaigns and grow your brand.', '$49.99', '12 hours', 'All Levels', 4.6, 3200, 'Marketing', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'),
('Business Management 101', 'James Wilson', 'Core concepts of leadership and business operations.', '$124.99', '20 hours', 'Intermediate', 4.8, 1500, 'Business', 'https://images.unsplash.com/photo-1454165205744-3b78555e5572'),
('Python for Beginners', 'Priya Sharma', 'The shortest path to learning Python programming.', 'Free', '10 hours', 'Beginner', 4.9, 5000, 'Development', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5');
