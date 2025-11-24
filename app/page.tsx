import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect based on auth status
  if (session?.user) redirect('/dashboard');
  else redirect('/auth/sign-in');
}
