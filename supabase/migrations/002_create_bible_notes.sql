-- ============================
-- 002: Create bible_notes table
-- ============================
CREATE TABLE public.bible_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.bible_users(auth_id),
  bible_id varchar,
  book_id varchar,
  book_chapter_id varchar,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own notes
CREATE POLICY "Users can insert own notes"
ON public.bible_notes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read their own notes
CREATE POLICY "Users can read own notes"
ON public.bible_notes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can update their own notes
CREATE POLICY "Users can update own notes"
ON public.bible_notes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can delete their own notes
CREATE POLICY "Users can delete own notes"
ON public.bible_notes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
