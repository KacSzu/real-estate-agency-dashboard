import DashboardAside from "@/components/dashboard/aside/dashboard-aside";
import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex flex-grow">
        <DashboardAside />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
