'use server';

import { createServerSupabaseClient } from '../../supabase/server';

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return { success: true };
}
