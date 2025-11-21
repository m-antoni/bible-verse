import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';
import AuthClientLayout from './AuthClientLayout';

export default async function AuthServerLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('AUTH GROUP', session);

  // ** logged In users redirected to dashboard
  if (user) redirect('/dashboard');
  return <AuthClientLayout>{children}</AuthClientLayout>;
}
