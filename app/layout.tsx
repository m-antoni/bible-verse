import './globals.css';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and Icons */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        {/* <Script
          src="https://kit.fontawesome.com/42d5adcbca.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        /> */}

        {/* Nucleo Icons */}
        <link
          href="/assets/argon/css/nucleo-icons.css"
          rel="stylesheet"
        />
        <link
          href="/assets/argon/css/nucleo-svg.css"
          rel="stylesheet"
        />

        {/* PopperJS (used globally if needed) */}
        <Script
          src="https://unpkg.com/@popperjs/core@2"
          strategy="lazyOnload"
        />

        {/* Argon Global Styles */}
        {/* <link
          href="/assets/argon/css/argon-dashboard-tailwind.css?v=1.0.1"
          rel="stylesheet"
        /> */}
      </head>

      <body className="...">{children}</body>
    </html>
  );
}
