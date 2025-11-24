'use server';

import { AuthError } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '../../supabase/server';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  // Redirect AFTER the server action completes
  redirect('/auth/sign-in');
}
