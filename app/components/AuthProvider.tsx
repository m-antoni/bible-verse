/**
 * AuthServerProvider.tsx
 *
 * Server-side layout for authentication pages (sign-in / sign-up).
 *
 * - Uses Supabase server client to get the current logged-in user.
 * - If a user is already logged in, redirects them away from auth pages to /dashboard.
 * - Wraps its children so that pages like sign-in and sign-up are rendered only for guests.
 *
 * Example usage:
 *
 * <AuthProvider>
 *   <SignInForm />
 * </AuthProvider>
 *
 * This ensures that logged-in users cannot access auth pages.
 */

import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import authActions from '@/app/lib/actions/auth';

type AuthProviderProps = { children: ReactNode };

export default async function AuthProvider({ children }: AuthProviderProps) {
  const user = await authActions.getCurrentUser();

  // ** Redirect logged-in users away from auth pages
  if (user) redirect('/dashboard');

  return <>{children}</>;
}
