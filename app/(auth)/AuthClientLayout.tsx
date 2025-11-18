'use client';

import { ReactNode } from 'react';

export default function AuthClientLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-500 font-sans">
      {children}
    </section>
  );
}
