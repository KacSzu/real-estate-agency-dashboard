import DashboardPropertiesTable from "@/components/dashboard/properties/dashboard-properties-table";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { BREADCRUMBS_PROPERTIES, FETCH_PER_PAGE_LIMIT } from "@/lib/constants";
import prisma from "@/lib/db";
interface IDashboardProperties {
  searchParams: {
    page?: string;
  };
}

async function fetchProperties(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const properties = await prisma.property.findMany({
    skip: offset,
    take: limit,
    include: {
      images: true,
    },
  });

  const totalProperties = await prisma.property.count();
  return { properties, totalProperties };
}
async function DashboardProperties({ searchParams }: IDashboardProperties) {
  const currentPage = searchParams?.page ?? 1;
  const { properties, totalProperties } = await fetchProperties(
    +currentPage,
    FETCH_PER_PAGE_LIMIT
  );
  if (!properties) return;
  return (
    <section className="space-y-4 p-6 md:p-8">
      <DashboardSectionHeader
        count={totalProperties}
        breadcrumbs={BREADCRUMBS_PROPERTIES}
        title="Properties"
        buttonLabel="Add property"
        href="/dashboard/properties/new"
      />
      {properties.length >= 1 ? (
        <DashboardPropertiesTable
          totalProperties={totalProperties}
          currentPage={currentPage}
          properties={properties}
        />
      ) : (
        <div className="flex justify-center items-center pt-24 font-semibold">
          No properties found
        </div>
      )}
    </section>
  );
}

export default DashboardProperties;
