import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';
import DashboardClientLayout from './DashboardClientLayout';

export default async function DashboardServerLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log('DASHBOARD GROUP', session);

  if (!session) redirect('/auth/sign-in'); // redirect if not logged in

  return <DashboardClientLayout session={session}>{children}</DashboardClientLayout>;
}
