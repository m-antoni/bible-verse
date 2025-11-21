import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';
import DashboardClientLayout from './DashboardClientLayout';

export default async function DashboardServerLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('DASHBOARD GROUP', session);

  // ** Redirect if not logged in
  if (!user) redirect('/auth/sign-in');

  return <DashboardClientLayout user={user}>{children}</DashboardClientLayout>;
}
