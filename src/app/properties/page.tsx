import Header from "@/components/header/header";
import PropertiesDisplay from "@/components/properties/properties-display";
import PropertiesFilters from "@/components/properties/properties-filters";
import { FETCH_PER_PAGE_LIMIT } from "@/lib/constants";
import prisma from "@/lib/db";
import { Property, PropertyType } from "@prisma/client";

interface CityCount {
  [city: string]: number;
}

interface IPropertiesPage {
  searchParams: {
    city?: string;
    type?: string;
    priceMin?: string;
    priceMax?: string;
    page?: string;
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
    priceMin?: string;
    priceMax?: string;
    page?: string;
  }) {
    const whereClause: {
      city?: string;
      type?: PropertyType;
      price?: {
        gte?: number;
        lte?: number;
      };
    } = {};

    if (searchParams.city) {
      whereClause.city = searchParams.city;
    }
    if (searchParams.type) {
      whereClause.type = searchParams.type as PropertyType;
    }
    if (searchParams.priceMin || searchParams.priceMax) {
      whereClause.price = {};
      if (searchParams.priceMin) {
        whereClause.price.gte = parseInt(searchParams.priceMin, 10);
      }
      if (searchParams.priceMax) {
        whereClause.price.lte = parseInt(searchParams.priceMax, 10);
      }
    }

    const currentPage = parseInt(searchParams.page ?? "1", 10);
    const offset = (currentPage - 1) * FETCH_PER_PAGE_LIMIT;

    const [filteredProperties, filteredPropertiesCount] = await Promise.all([
      prisma.property.findMany({
        where: whereClause,
        include: {
          images: true,
        },
        skip: offset,
        take: FETCH_PER_PAGE_LIMIT,
      }),
      prisma.property.count({ where: whereClause }),
    ]);

    return { filteredProperties, filteredPropertiesCount };
  }

  const properties = await fetchAllProperties();
  const { filteredProperties, filteredPropertiesCount } =
    await fetchFilteredProperties(searchParams);
  const cityCounts = countCities(properties);
  const currentPage = searchParams?.page ?? 1;
  const totalPages = Math.ceil(filteredPropertiesCount / FETCH_PER_PAGE_LIMIT);

  return (
    <>
      <Header />
      <div className="pt-[150px] max-w-5xl xl:max-w-6xl mx-auto px-4 py-12 space-y-4">
        <PropertiesFilters cityCounts={cityCounts} />
        <PropertiesDisplay
          searchParams={searchParams}
          currentPage={+currentPage}
          totalPages={totalPages}
          filteredProperties={filteredProperties}
        />
      </div>
    </>
  );
}
