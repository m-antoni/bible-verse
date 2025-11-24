'use server';

import { AuthError } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '../../supabase/server';

export async function signOutAction(): Promise<{ success: boolean; error?: AuthError | null }> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out failed', error);
    throw new Error('Failed to sign out');
  }

  return { success: true };
}
