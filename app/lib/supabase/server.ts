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

import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options); // allowed in server action
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', { ...options, maxAge: 0 });
        },
      },
    },
  );
}

/*
 *
 ** OLD VERSION BELOW AS FOR REFERENCE
 * use only for debugging purposes
 *
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { cookies as nextCookies } from 'next/headers';
// import { createServerClient } from '@supabase/ssr';

// export async function createServerSupabaseClient() {
//   const cookieStore = await nextCookies();

//   const cookiesAdapter = {
//     get: (name: string) => cookieStore.get(name)?.value ?? null,
//     getAll: () => cookieStore.getAll().map((c) => ({ name: c.name, value: c.value })),
//     set: (name: string, value: string, options?: { path?: string; maxAge?: number }) =>
//       cookieStore.set({ name, value, ...options }),
//     remove: (name: string, options?: { path?: string }) =>
//       cookieStore.set({ name, value: '', ...options, maxAge: 0 }),
//   };

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       // cast to any to bypass TypeScript restriction
//       cookies: cookiesAdapter,
//     } as any,
//   );
// }
