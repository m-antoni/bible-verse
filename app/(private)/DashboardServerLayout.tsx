import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';
import DashboardClientLayout from './DashboardClientLayout';

export default async function DashboardServerLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient(); // server-side, reads cookies
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // Redirect if not logged in
  if (error || !session?.user) {
    redirect('/auth/sign-in');
  }

  return <DashboardClientLayout user={session.user}>{children}</DashboardClientLayout>;
}
