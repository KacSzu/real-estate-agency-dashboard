import DashboardPropertiesTable from "@/components/dashboard/properties/dashboard-properties-table";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_PROPERTIES } from "@/lib/constants";
import prisma from "@/lib/db";

async function fetchProperties() {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
    },
  });

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
        buttonLabel="Add property"
        href="/dashboard/properties/new"
      />
      {properties.length >= 1 ? (
        <DashboardPropertiesTable properties={properties} />
      ) : (
        <div className="flex justify-center items-center pt-24 font-semibold">
          No properties found
        </div>
      )}
    </section>
  );
}

export default DashboardProperties;
