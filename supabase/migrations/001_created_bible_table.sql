-- =============================
-- Table: bible
-- =============================
CREATE TABLE public.bible (
    bible_id VARCHAR PRIMARY KEY NOT NULL,  
    name VARCHAR,                           
    name_local VARCHAR,                     
    abbreviation_local VARCHAR,             
    language VARCHAR,                        
    copyright TEXT,                         
    books TEXT[],                            
    created_at TIMESTAMPTZ DEFAULT now()    
);

COMMENT ON TABLE public.bible IS 'Stores Bibles like KJV, NIV, etc.';
COMMENT ON COLUMN public.bible.books IS 'Array of book IDs in the Bible';

-- Enable RLS
ALTER TABLE public.bible ENABLE ROW LEVEL SECURITY;

-- Public read-only policy
CREATE POLICY "Allow read all bible"
ON public.bible
FOR SELECT
USING (true);
