// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await nextCookies(); // Await required in Next.js 16

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URI!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // remove setAll entirely, cannot mutate cookies in server component
      },
    },
  );
}
