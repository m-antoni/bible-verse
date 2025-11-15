import { supabase } from './client';

// Sign up
export async function signUpWithEmailPassword(fullName: string, email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        full_name: fullName,
      },
    },
  });
}

// Sign In
export async function signInWithEmailPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

// Sign out
export async function signOut() {
  return supabase.auth.signOut();
}

// Get Session
export async function getCurrentSession() {
  return supabase.auth.getSession();
}
