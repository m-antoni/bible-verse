/**
 * Supabase Admin client for server-side operations
 *
 * 1. Service role client:
 *    - Uses your Supabase service role key.
 *    - Bypasses Row Level Security (RLS), so it has full access to your database.
 *
 * 2. Security warning:
 *    - Do NOT expose this client to the browser or client-side code.
 *    - Only use it in server actions, server routes, or API handlers.
 *
 * 3. Usage:
 *    - Use `supabaseAdmin` for tasks like bulk inserts, admin queries, or actions
 *      that require full database access.
 */
import { ENV } from '@/app/constants/env';
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY!);
