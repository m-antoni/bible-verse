'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, session }: { children: ReactNode; session: Session }) => {
  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
