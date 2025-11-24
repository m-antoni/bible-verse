'use client';

import Script from 'next/script';
import { ReactNode, useState, useEffect } from 'react';
import SideNavbar from '@/app/components/Sidebar';
import TopNavbar from '@/app/components/TopNavbar';
import { AuthProvider } from '@/app/context/AuthContext';
import ConfirmModal from '@/app/components/ConfirmModal';
import { authService } from '@/app/lib/services/authService';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/app/lib/supabase/client';
import { signOutAction } from '../lib/actions/auth/signOut';

interface DashboardClientLayoutProps {
  children: ReactNode;
  user: User; // or type it properly with Supabase User type
}
export default function DashboardClientLayout({ children, user }: DashboardClientLayoutProps) {
  // toggle sidebar open and close
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDark, setSidebarDark] = useState(true);
  // confirm modal open and close
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarTheme = () => setSidebarDark(!sidebarDark);

  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/sign-in');
        router.refresh();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  // handle signout
  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOutAction();
      if (error) {
        console.error('Sign out failed:', error.message);
      } else {
        router.push('/auth/sign-in');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    } finally {
      setLoading(false);
      setSignOutModalOpen(false);
      router.refresh(); // clears cached dashboard
    }
  };

  return (
    <>
      <AuthProvider user={user}>
        <Script src="/assets/argon/js/plugins/perfect-scrollbar.min.js" strategy="lazyOnload" />
        <Script src="/assets/argon/js/plugins/chartjs.min.js" strategy="lazyOnload" />

        <div className="min-h-screen m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 dark:bg-slate-900 text-slate-500">
          <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
          <SideNavbar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            sidebarDark={sidebarDark}
            openSignOutModal={() => setSignOutModalOpen(true)}
          />
          <ConfirmModal
            isOpen={signOutModalOpen}
            onConfirm={handleSignOut}
            onCancel={() => setSignOutModalOpen(false)}
            title="Sign Out"
            loading={loading}
            message="Are you sure you want to sign out?"
          />
          <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
            <TopNavbar
              toggleSidebar={toggleSidebar}
              toggleSidebarTheme={toggleSidebarTheme}
              sidebarDark={sidebarDark}
            />
            <div className="w-full px-6 py-6 mx-auto">{children}</div>
          </main>
        </div>
      </AuthProvider>
    </>
  );
}
