import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code'); // OAuth code
  let next = searchParams.get('next') ?? '/';
  if (!next.startsWith('/')) next = '/';

  const supabase = await createServerSupabaseClient();

  // ** OAuth flow
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  // ** Email signup / magic link flow
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (user && !userError) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  // ** Fallback if neither works
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
