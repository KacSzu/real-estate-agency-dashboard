"use client";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import PropertyImageCarousel from "./property-image-carousel";
import PropertiesPagination from "../ui/properties-pagination";
import { useRouter } from "next/navigation";
import PropertyBadges from "./property-badges";
import PropertyStats from "./property-stats";
import PropertyLocation from "./property-location";

interface IPropertiesDisplay {
  filteredProperties: PropertyWithImagesType[];
  currentPage: number;
  totalPages: number;
  searchParams: {
    city?: string | undefined;
    type?: string | undefined;
    page?: string | undefined;
  };
}

function PropertiesDisplay({
  filteredProperties,
  currentPage,
  totalPages,
  searchParams,
}: IPropertiesDisplay) {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/properties?${params.toString()}`);
  };

  if (filteredProperties.length < 1)
    return (
      <div className="text-center font-semibold pt-10">
        <p>
          We regret to inform you that we currently do not have any properties
          available for sale.
        </p>
      </div>
    );

  return (
    <section className="space-y-8">
      {filteredProperties.map((property, i) => (
        <Link
          className="flex flex-col border p-3 rounded-xl bg-muted shadow-md md:flex-row cursor-pointer"
          href={`/properties/${property.id}`}
          key={i}
        >
          <div>
            <PropertyImageCarousel images={property.images} />
          </div>
          <div className="flex gap-2 flex-col md:w-full py-4 md:px-8">
            <PropertyBadges property={property} />
            <p className="text-base lg:text-xl font-semibold lg:pr-3">
              {formatCurrency(property.price)}
            </p>
            <p className="text-2xl font-semibold">{property.title}</p>
            <PropertyLocation country={property.country} city={property.city} />
            <PropertyStats
              squares={property.squares}
              numberRooms={property.numberRooms}
              numberBedrooms={property.numberBedrooms}
              numberBathrooms={property.numberBathrooms}
            />
            <p className="hidden md:block text-sm">{property.description}</p>
            <p className="md:hidden">{property.description.slice(0, 150)}...</p>
          </div>
        </Link>
      ))}
      {totalPages > 1 && (
        <PropertiesPagination
          onPageChange={handlePageChange}
          currentPage={+currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}

export default memo(PropertiesDisplay);
