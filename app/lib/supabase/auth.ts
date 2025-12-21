import { ENV } from '@/app/constants/env';
import { supabase } from './client';
import { TABLES } from '@/app/constants/table';
import { SupabaseUser } from '@/app/types';

// ** Sign up
export async function signUpWithEmailPassword(fullName: string, email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${ENV.SITE_URL}/callback`,
      data: {
        full_name: fullName,
      },
    },
  });
}

// ** Sign In
export async function signInWithEmailPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

// ** Sign In Google OAuth
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${ENV.SITE_URL}/callback`,
    },
  });

  // error
  if (error) throw error;

  //** redirect URL
  return data.url;
}

// ** Insert User once GoogleOAuth success!
export async function insertUserFromGoogle(user: SupabaseUser) {
  // insert into bible_users table
  const { data, error } = await supabase.from(TABLES.BIBLE_USERS).upsert(
    {
      auth_id: user.id,
      display_name: user.user_metadata.full_name || user.email,
    },
    { onConflict: 'auth_id', ignoreDuplicates: true }, // prevents duplicates
  );

  if (error) {
    throw error;
  }

  return data;
}
