-- ============================
-- 001: Create bible_users table
-- ============================
CREATE TABLE public.bible_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid NOT NULL UNIQUE,
  display_name text,
  created_at timestamptz DEFAULT now()
);


-- Enable Row Level Security on bible_users
ALTER TABLE public.bible_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own record
CREATE POLICY "Users can read own record"
ON public.bible_users
FOR SELECT
TO authenticated
USING (auth.uid() = auth_id);

-- Policy: Users can insert their own record
CREATE POLICY "Users can insert own record"
ON public.bible_users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = auth_id);
