import DashboardPropertiesTable from "@/components/dashboard/properties/dashboard-properties-table";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_PROPERTIES } from "@/lib/constants";
import prisma from "@/lib/db";
import { Suspense } from "react";

async function fetchProperties() {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
    },
  });
  if (!properties) {
    return null;
  }

  return properties;
}
async function DashboardProperties() {
  const properties = await fetchProperties();
  if (!properties) return;
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        breadcrumbs={BREADCRUMBS_PROPERTIES}
        title="Properties"
        count={properties.length}
        buttonLabel="Add property"
        href="/dashboard/properties/new"
      />
      <Suspense fallback={<div>LOADING</div>}>
        <DashboardPropertiesTable properties={properties} />
      </Suspense>
    </section>
  );
}

export default DashboardProperties;
