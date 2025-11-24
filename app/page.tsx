import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect based on auth status
  if (user) redirect('/dashboard');
  else redirect('/auth/sign-in');
}
