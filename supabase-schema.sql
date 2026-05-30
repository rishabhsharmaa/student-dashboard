-- Create the courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (since we're using the anon key)
CREATE POLICY "Allow public read access"
  ON courses
  FOR SELECT
  TO anon
  USING (true);

-- Seed data: insert 4 mock courses
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'atom'),
  ('System Design Fundamentals', 42, 'network'),
  ('TypeScript Mastery', 91, 'file-code-2'),
  ('Node.js Backend Architecture', 28, 'server');
