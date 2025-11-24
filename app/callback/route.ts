import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  let next = url.searchParams.get('next') ?? '/';

  // keep redirect paths relative
  if (!next.startsWith('/')) next = '/';

  // correctly detect real production domain (Vercel fix)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const isDev = process.env.NODE_ENV === 'development';
  const finalOrigin = isDev ? url.origin : forwardedHost ? `https://${forwardedHost}` : url.origin;

  const supabase = await createServerSupabaseClient();

  // OAuth / magic link exchange
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${finalOrigin}${next}`);
    }
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (user && !sessionError) {
    return NextResponse.redirect(`${finalOrigin}${next}`);
  }

  // Fallback
  return NextResponse.redirect(`${finalOrigin}/auth/auth-code-error`);
}
