import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/lib/actions/auth/getCurrentUser';

export default async function Home() {
  const user = await getCurrentUser();
  // Redirect based on auth status
  if (user) redirect('/dashboard');
  else redirect('/auth/sign-in');
}
