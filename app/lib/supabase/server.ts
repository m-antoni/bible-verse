/**
 * Server-side Supabase client for Next.js 16
 *
 * 1. Server-side client:
 *    - Supabase normally runs in the browser.
 *    - On the server, we use this client to read/write cookies for user sessions.
 *
 * 2. Cookies adapter:
 *    - Uses Next.js 16 `cookies()` API to manage Supabase auth cookies.
 *    - Provides `get`, `set`, `remove` so Supabase can manage sessions seamlessly.
 *
 * 3. OAuth & email signup:
 *    - Google OAuth and email magic links require cookies to work correctly.
 *    - Without this, users may get logged out or see errors like "flow_state_not_found".
 *
 * 4. Usage:
 *    - Call `createServerSupabaseClient()` in server components, layouts, or server actions
 *      to get a Supabase client with cookie support.
 */

// utils/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // This error is expected when called from a Server Component.
            // We ignore it here because your proxy.ts/middleware.ts
            // will handle the actual session refresh logic.
          }
        },
      },
    },
  );
}
