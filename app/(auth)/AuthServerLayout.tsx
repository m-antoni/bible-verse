import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import AuthClientLayout from './AuthClientLayout';
import authActions from '@/app/lib/actions/auth';

export default async function AuthServerLayout({ children }: { children: ReactNode }) {
  const user = await authActions.getCurrentUser();

  // ** logged In users redirected to dashboard
  if (user) redirect('/dashboard');
  return <AuthClientLayout>{children}</AuthClientLayout>;
}
