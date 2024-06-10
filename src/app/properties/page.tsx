import Header from "@/components/header/header";
import PropertiesDisplay from "@/components/properties/properties-display";
import PropertiesFilters from "@/components/properties/properties-filters";
import prisma from "@/lib/db";
import { Property, PropertyType } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

interface CityCount {
  [city: string]: number;
}

interface IPropertiesPage {
  searchParams: {
    city?: string;
    type?: string;
  };
}

function countCities(properties: Property[]) {
  const cityCount: CityCount = properties.reduce((acc: CityCount, property) => {
    if (acc[property.city]) {
      acc[property.city] += 1;
    } else {
      acc[property.city] = 1;
    }
    return acc;
  }, {});

  return Object.entries(cityCount).map(([city, count]) => ({ city, count }));
}

async function fetchAllProperties() {
  noStore();
  const properties = await prisma.property.findMany({
    include: {
      images: true,
    },
  });

  return properties;
}

export default async function PropertiesPage({
  searchParams,
}: IPropertiesPage) {
  async function fetchFilteredProperties(searchParams: {
    city?: string;
    type?: string;
  }) {
    noStore();

    const whereClause: { city?: string; type?: PropertyType } = {};

    if (searchParams.city) {
      whereClause.city = searchParams.city;
    }
    if (searchParams.type) {
      whereClause.type = searchParams.type as PropertyType;
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        images: true,
      },
    });

    return properties;
  }

  const filteredProperties = await fetchFilteredProperties(searchParams);
  const allProperties = await fetchAllProperties();
  const cityCounts = countCities(allProperties);

  return (
    <>
      <Header />
      <div className="pt-[150px] max-w-5xl xl:max-w-6xl mx-auto px-4 py-12 space-y-4">
        <PropertiesFilters cityCounts={cityCounts} />
        <Suspense>
          <PropertiesDisplay filteredProperties={filteredProperties} />
        </Suspense>
      </div>
    </>
  );
}
