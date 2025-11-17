import AuthServerLayout from './AuthServerLayout';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthServerLayout>{children}</AuthServerLayout>;
}
