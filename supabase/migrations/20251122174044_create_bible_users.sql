-- =============================
-- Table: bible_users
-- =============================
CREATE TABLE public.bible_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE,  -- link to Supabase auth.users
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.bible_users IS 'Stores users of the Bible app';
COMMENT ON COLUMN public.bible_users.auth_id IS 'Supabase auth user ID';

-- Enable RLS
ALTER TABLE public.bible_users ENABLE ROW LEVEL SECURITY;

-- Users can manage their own bible_users record
CREATE POLICY "Users can manage their own bible_users"
ON public.bible_users
FOR ALL
USING (auth_id = auth.uid());
