'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

interface AuthRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthRoute({ children, redirectTo = '/dashboard' }: AuthRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace(redirectTo); // already logged in, go to dashboard
      } else {
        setAuthenticated(true); // not logged in, can access auth page
      }
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace(redirectTo);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router, redirectTo]);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null;

  return <>{children}</>;
}
