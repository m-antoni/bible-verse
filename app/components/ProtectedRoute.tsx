// components/ProtectedRoute.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase/client';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = '/auth/sign-in',
}: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace(redirectTo);
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();

    // Optional: Listen for auth state changes (logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace(redirectTo);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router, redirectTo]);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null; // redirecting

  return <>{children}</>;
}
