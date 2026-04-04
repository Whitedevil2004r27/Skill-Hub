-- 1. Align Profiles table with application requirements
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS skills text[],
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews integer DEFAULT 0;

-- 2. Update Jerry to be a mentor for testing
UPDATE public.profiles 
SET 
  role = 'mentor',
  title = 'Senior Software Engineer',
  company = 'SkillHub Alpha',
  location = 'San Francisco, CA',
  skills = ARRAY['React', 'TypeScript', 'Node.js', 'System Design'],
  bio = 'Passionate about helping others learn the art of full-stack development.',
  rating = 5.0,
  reviews = 1
WHERE display_name = 'Jerry';

-- 3. Create Courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    instructor text NOT NULL,
    rating numeric DEFAULT 0,
    students integer DEFAULT 0,
    duration text,
    level text,
    price text,
    category text,
    image text,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Courses are viewable by everyone' AND tablename = 'courses') THEN
        CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
    END IF;
END $$;

-- 4. Initial Course Data (from mocks)
INSERT INTO public.courses (title, instructor, rating, students, duration, level, price, category, image, description)
VALUES 
('Full-Stack Web Development Masterclass', 'Sarah Chen', 4.9, 1240, '12 weeks', 'Beginner', '$299', 'Web Development', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop', 'Learn modern web development with React, Node.js, and MongoDB from industry experts.'),
('UI/UX Design Fundamentals', 'Alex Rodriguez', 4.8, 856, '8 weeks', 'Beginner', '$199', 'Design', 'https://images.unsplash.com/photo-1541462608141-67561c6bc021?w=500&h=300&fit=crop', 'Master the principles of user-centered design and create stunning digital experiences.'),
('Data Science & Machine Learning', 'Dr. Emily Watson', 4.9, 567, '16 weeks', 'Intermediate', '$399', 'Data Science', 'https://images.unsplash.com/photo-1551288049-bbbda536ad89?w=500&h=300&fit=crop', 'Dive deep into data analysis, machine learning algorithms, and AI applications.'),
('Mobile App Development with React Native', 'Marcus Johnson', 4.7, 423, '10 weeks', 'Intermediate', '$249', 'Mobile Development', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop', 'Build cross-platform mobile apps using React Native and modern development practices.'),
('DevOps & Cloud Architecture', 'Jennifer Park', 4.8, 234, '14 weeks', 'Advanced', '$349', 'DevOps', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop', 'Learn containerization, CI/CD, and cloud deployment strategies for modern applications.'),
('Cybersecurity Essentials', 'Robert Kim', 4.6, 189, '6 weeks', 'Beginner', '$179', 'Security', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop', 'Understand security fundamentals and protect applications from common vulnerabilities.')
ON CONFLICT DO NOTHING;
