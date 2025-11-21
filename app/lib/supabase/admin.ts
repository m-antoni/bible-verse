import { ENV } from '@/app/constants/env';
import { createClient } from '@supabase/supabase-js';

// ** This uses your service role key, so it bypasses RLS.
// ** Note Do NOT expose this to the client.
export const supabaseAdmin = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY!);
