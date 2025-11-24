'use server';

import { User } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase.auth.getSession();

  return data?.session?.user ?? null;
}
