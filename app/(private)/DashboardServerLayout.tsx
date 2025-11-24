import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import DashboardClientLayout from './DashboardClientLayout';
import { getCurrentUser } from '@/app/lib/actions/auth/getCurrentUser';

export default async function DashboardServerLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  // Redirect if not logged in
  if (!user) redirect('/auth/sign-in');

  return <DashboardClientLayout user={user}>{children}</DashboardClientLayout>;
}
