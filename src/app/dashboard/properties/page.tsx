import DashboardPropertiesTable from "@/components/dashboard/properties/dashboard-properties-table";
import { Button, buttonVariants } from "@/components/ui/button";
import DashboardBreadcrumbs from "@/components/ui/dashboard-breadcrumb";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

async function DashboardProperties() {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
    },
  });
  console.log(properties);
  const breadcrumbsProperties = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Properties", link: "/dashboard/properties" },
  ];
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardBreadcrumbs breadcrumbs={breadcrumbsProperties} />
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold tracking-tight">
          Properties ({properties.length})
        </h2>
        <Link
          href="/dashboard/properties/new"
          className={cn(buttonVariants({ variant: "default" }), "space-x-2")}
        >
          <span className="text-background text-lg">
            <HiPlus />
          </span>
          <span>Add property</span>
        </Link>
      </div>
      <div>
        <DashboardPropertiesTable properties={properties} />
      </div>
    </section>
  );
}

export default DashboardProperties;
