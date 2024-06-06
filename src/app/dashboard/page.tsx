import DashboardChart from "@/components/dashboard/dashboard-chart";
import DashboardStatisticsCards from "@/components/dashboard/dashboard-statistics-cards";
import prisma from "@/lib/db";

async function fetchProperties() {
  const properties = await prisma.property.findMany();

  return properties;
}

async function fetchUsers() {
  const users = await prisma.user.findMany();

  return users;
}
export default async function DashboardPage() {
  const properties = await fetchProperties();
  const users = await fetchUsers();
  console.log(users);
  return (
    <section className="space-y-4 p-6">
      <h1 className="text-2xl  font-bold tracking-tight">
        Hi, Welcome back 👋
      </h1>
      <DashboardStatisticsCards properties={properties} users={users} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <DashboardChart />
        <div></div>
      </div>
    </section>
  );
}
