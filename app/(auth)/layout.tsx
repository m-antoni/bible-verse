export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      {children}
    </section>
  );
}
