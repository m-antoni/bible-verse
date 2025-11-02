'use client';

import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and icons */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

        {/* Font Awesome */}
        <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous" strategy="lazyOnload" />

        {/* Nucleo Icons */}
        <link href="/assets/argon/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/assets/argon/css/nucleo-svg.css" rel="stylesheet" />

        {/* PopperJS */}
        <Script src="https://unpkg.com/@popperjs/core@2" strategy="lazyOnload" />

        {/* Argon Dashboard CSS */}
        <link href="/assets/argon/css/argon-dashboard-tailwind.css?v=1.0.1" rel="stylesheet" />
      </head>

      <body className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
        {children}

        {/* Perfect Scrollbar */}
        <Script src="/assets/argon/js/plugins/perfect-scrollbar.min.js" strategy="lazyOnload" />

        {/* Argon Dashboard main JS */}
        <Script src="/assets/argon/js/argon-dashboard-tailwind.js?v=1.0.1" strategy="lazyOnload" />
      </body>
    </html>
  );
}
