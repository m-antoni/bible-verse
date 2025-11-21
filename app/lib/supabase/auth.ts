import { ENV } from '@/app/constants/env';
import { supabase } from './client';

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

// ** Sign out
export async function signOut() {
  return supabase.auth.signOut();
}

// ** Get Session
export async function getCurrentSession() {
  return supabase.auth.getSession();
}

// ** Sign In Google OAuth
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  });

  // error
  if (error) throw error;

  //** redirect URL
  return data.url;
}
