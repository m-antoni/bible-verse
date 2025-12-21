'use server';

import { User } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();

  // Securely fetch the user on the server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is found, it will safely return null
  return user ?? null;
}
