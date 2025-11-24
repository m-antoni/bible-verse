'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../supabase/server';

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  // Redirect immediately in server action
  redirect('/auth/sign-in');
}
