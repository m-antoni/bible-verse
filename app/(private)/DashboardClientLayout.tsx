'use client';

import Script from 'next/script';
import { useState } from 'react';
import SideNavbar from '@/app/components/Sidebar';
import TopNavbar from '@/app/components/TopNavbar';

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDark, setSidebarDark] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarTheme = () => setSidebarDark(!sidebarDark);

  return (
    <>
      <Script src="/assets/argon/js/plugins/perfect-scrollbar.min.js" strategy="lazyOnload" />
      <Script src="/assets/argon/js/plugins/chartjs.min.js" strategy="lazyOnload" />

      <div className="min-h-screen m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 dark:bg-slate-900 text-slate-500">
        <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
        <SideNavbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          sidebarDark={sidebarDark}
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
    </>
  );
}
