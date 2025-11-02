'use client';

import Script from 'next/script';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
      </div>
    </>
  );
}
