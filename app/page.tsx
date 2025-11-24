import { redirect } from 'next/navigation';
import authActions from '@/app/lib/actions/auth';

export default async function Home() {
  const user = await authActions.getCurrentUser();
  // Redirect based on auth status
  if (user) redirect('/dashboard');
  else redirect('/auth/sign-in');
}
