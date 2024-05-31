import DashboardChart from "@/components/dashboard/dashboard-chart";
import DashboardStatisticsCards from "@/components/dashboard/dashboard-statistics-cards";

export default async function DashboardPage() {
  return (
    <section className="space-y-4 p-6">
      <h1 className="text-2xl  font-bold tracking-tight">
        Hi, Welcome back John 👋
      </h1>
      <DashboardStatisticsCards />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <DashboardChart />
        <div></div>
      </div>
    </section>
  );
}
