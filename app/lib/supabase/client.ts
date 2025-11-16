import { ENV } from '@/app/constants/env';
import { createClient } from '@supabase/supabase-js';

// URL and anon key from environment variables
const SUPABASE_URI = ENV.SUPABASE_URI;
const SUPABASE_ANON_KEY = ENV.SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URI, SUPABASE_ANON_KEY);
