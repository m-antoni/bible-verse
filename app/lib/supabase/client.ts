import { createClient } from '@supabase/supabase-js';

// URL and anon key from environment variables
const SUPABASE_URI = process.env.NEXT_PUBLIC_SUPABASE_URI!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URI, SUPABASE_ANON_KEY);
