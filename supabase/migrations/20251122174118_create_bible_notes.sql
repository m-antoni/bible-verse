CREATE TABLE public.bible_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID NOT NULL, -- links to bible_users.auth_id
    bible_id VARCHAR REFERENCES public.bible(bible_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    book_id VARCHAR REFERENCES public.bible_books(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    book_chapter_id VARCHAR,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_bible_notes_user FOREIGN KEY (auth_id)
        REFERENCES public.bible_users(auth_id) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMENT ON TABLE public.bible_notes IS 'Stores personal notes for each Bible book/chapter';
COMMENT ON COLUMN public.bible_notes.book_chapter_id IS 'Reference like GEN.1 for chapters';

-- Enable RLS
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- Users can manage their own notes via their bible_users.auth_id
CREATE POLICY "Users can manage their own notes"
ON public.bible_notes
FOR ALL
USING (
    auth_id IN (SELECT auth_id FROM public.bible_users WHERE auth_id = auth.uid())
);