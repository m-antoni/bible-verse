import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

type AuthProviderProps = { children: ReactNode };

export default async function AuthProvider({ children }: AuthProviderProps) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log('AUTH PROVIDER SESSION', session);

  // Redirect logged-in users away from auth pages
  if (session) redirect('/dashboard');

  return <>{children}</>;
}
