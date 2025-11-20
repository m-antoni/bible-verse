'use client';

import Script from 'next/script';
import { ReactNode, useState } from 'react';
import SideNavbar from '@/app/components/Sidebar';
import TopNavbar from '@/app/components/TopNavbar';
import { Session } from '@supabase/supabase-js';
import { AuthProvider } from '@/app/context/AuthContext';
import ConfirmModal from '@/app/components/ConfirmModal';
import { authService } from '@/app/lib/services/authService';
import { useRouter } from 'next/navigation';

interface DashboardClientLayoutProps {
  children: ReactNode;
  session: Session; // or type it properly with Supabase User type
}
export default function DashboardClientLayout({ children, session }: DashboardClientLayoutProps) {
  // toggle sidebar open and close
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDark, setSidebarDark] = useState(true);
  // confirm modal open and close
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarTheme = () => setSidebarDark(!sidebarDark);

  const router = useRouter();

  // handle signout
  const handleSignOut = async () => {
    try {
      setLoading(true);
      // ** Sign out supabase auth signout
      const response = await authService.signOut();
      if (response && !response.success) {
        console.log('Error occured', response.message);
        setLoading(false);
      }
      if (response && response.success) {
        router.push('/auth/sign-in');
        router.refresh(); // ensures SSR layout re-runs and session is cleared
        setLoading(false);
      }
      setSignOutModalOpen(false);
    } catch (error) {
      console.log(`Internal Server Error`, error);
      setSignOutModalOpen(false);
    }
  };

  return (
    <>
      <AuthProvider session={session}>
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
