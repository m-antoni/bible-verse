-- =============================
-- Table: bible_books
-- =============================
CREATE TABLE public.bible_books (
    id VARCHAR PRIMARY KEY,                       
    bible_id VARCHAR NOT NULL REFERENCES public.bible(bible_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    abbreviation VARCHAR,                               
    name VARCHAR,                                      
    nameLong VARCHAR,                                 
    chapters INTEGER,                                  
    chapter_01 VARCHAR,                                
    created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.bible_books IS 'Stores all books for each Bible';
COMMENT ON COLUMN public.bible_books.chapter_01 IS 'Reference for first chapter';

-- Enable RLS
ALTER TABLE public.bible_books ENABLE ROW LEVEL SECURITY;

-- Public read-only policy
CREATE POLICY "Allow read all bible_books"
ON public.bible_books
FOR SELECT
USING (true);