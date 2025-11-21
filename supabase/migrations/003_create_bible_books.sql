-- ============================
-- 003: Create bible_books table
-- ============================
CREATE TABLE public.bible_books (
  id varchar PRIMARY KEY,
  bible_id varchar NOT NULL,
  abbreviation varchar,
  name varchar,
  name_long varchar,
  chapters integer,
  chapter_01 varchar,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Enable Row Level Security on bible_books
ALTER TABLE public.bible_books ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read bible_books
CREATE POLICY "Authenticated users can read books"
ON public.bible_books
FOR SELECT
TO authenticated
USING (true);

-- Alter bible_notes to reference bible_books
ALTER TABLE public.bible_notes
ADD CONSTRAINT fk_bible_notes_book
FOREIGN KEY (book_id)
REFERENCES public.bible_books(id)
ON DELETE CASCADE;
