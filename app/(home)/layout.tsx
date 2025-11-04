'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';
import SideNavbar from '@/app/components/Sidebar';
import TopNavbar from '@/app/components/TopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [sidebarDark, setSidebarDark] =
    useState(true);

  const toggleSidebar = () =>
    setSidebarOpen(!sidebarOpen);
  const toggleSidebarTheme = () =>
    setSidebarDark(!sidebarDark);

  return (
    <>
      {/* Dashboard-specific scripts */}
      <Script
        src="/assets/argon/js/plugins/perfect-scrollbar.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="/assets/argon/js/plugins/chartjs.min.js"
        strategy="lazyOnload"
      />
      {/* <Script
        src="/assets/argon/js/argon-dashboard-tailwind.js?v=1.0.1"
        strategy="lazyOnload"
      /> */}

      {/* Dashboard wrapper */}
      <div className="min-h-screen m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 dark:bg-slate-900 text-slate-500">
        {/* Background color wrapper */}
        <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
        <>
          {/* <!-- SideNavbar  --> */}
          <SideNavbar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            sidebarDark={sidebarDark}
          />
          {/* <!-- end SideNavbar --> */}

          <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
            {/* <!-- TopNavbar --> */}
            <TopNavbar
              toggleSidebar={toggleSidebar}
              toggleSidebarTheme={
                toggleSidebarTheme
              }
              sidebarDark={sidebarDark}
            />
            {/* <!-- end TopNavbar --> */}

            {/* <!-- cards --> */}
            <div className="w-full px-6 py-6 mx-auto">
              {/* <!-- children  --> */}
              {children}
            </div>
            {/* <!-- end cards --> */}
          </main>
        </>
      </div>
    </>
  );
}
