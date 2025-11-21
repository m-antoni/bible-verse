/**
 * Browser-side Supabase client
 *
 * - This client is used for React components or any code running in the browser.
 * - It uses the public Supabase anon key, so it can safely make read/write requests
 *   for data that doesn’t require server-side security or cookie handling.
 * - Unlike the server-side client, it does NOT handle cookies or server sessions.
 * - Example usage in a React component:
 *     const { data, error } = await supabase.from('notes').select('*');
 *
 * Note:
 * - For OAuth, email signup, or any flows that require session cookies,
 *   use the server-side client (`server.ts`) instead.
 */

import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
