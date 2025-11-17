import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';
import AuthClientLayout from './AuthClientLayout';

export default async function AuthServerLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('AUTH GROUP', session);

  if (session) redirect('/dashboard'); // logged-in users go to dashboard

  return <AuthClientLayout>{children}</AuthClientLayout>;
}
