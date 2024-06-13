import prisma from "@/lib/db";
import HomepagePropertiesStatisticsCard from "./homepage-properties-statistic-card";
import HomepagePropertiesDisplayCard from "./homepage-properties-display-card";

const HomepagePropertiesDisplay = async () => {
  const lastThreeAddedProperties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
    take: 3,
  });
  if (lastThreeAddedProperties.length < 3) return;
  return (
    <section className="max-w-5xl xl:max-w-6xl mx-auto px-4 grid grid-cols-12 grid-rows-12 gap-4 min-h-[600px]">
      <HomepagePropertiesDisplayCard
        property={lastThreeAddedProperties[0]}
        className="col-span-12 md:col-span-4 row-span-12"
      />
      <HomepagePropertiesDisplayCard
        property={lastThreeAddedProperties[1]}
        className="col-span-12 md:col-span-8 row-span-6"
      />
      <HomepagePropertiesDisplayCard
        property={lastThreeAddedProperties[2]}
        className="col-span-12 md:col-span-4 row-span-6"
      />
      <HomepagePropertiesStatisticsCard />
    </section>
  );
};

export default HomepagePropertiesDisplay;
