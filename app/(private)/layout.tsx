import DashboardServerLayout from './DashboardServerLayout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardServerLayout>{children}</DashboardServerLayout>;
}
