/**
 * AuthContext.tsx
 *
 * Provides a global authentication context for the app.
 *
 * - Stores the currently logged-in Supabase `User`.
 * - Wraps part of the app with `AuthProvider` to make `user` available globally.
 * - Use the `useAuth()` hook in any component to access the current user.
 *
 * Example:
 *
 * <AuthProvider user={currentUser}>
 *    <App />
 * </AuthProvider>
 *
 * const { user } = useAuth();
 * console.log(user.email);
 *
 * This eliminates the need to pass `user` down via props.
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User; // changed from session
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, user }: { children: ReactNode; user: User }) => {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
