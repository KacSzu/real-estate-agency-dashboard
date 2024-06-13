"use client";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import PropertyImageCarousel from "./property-image-carousel";
import PropertiesPagination from "../ui/properties-pagination";
import { useRouter } from "next/navigation";

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

  return (
    <section className=" space-y-8">
      {filteredProperties.map((property, i) => (
        <Link
          className="flex flex-col border p-3 rounded-2xl bg-muted/50 shadow-md md:flex-row cursor-pointer"
          href={`/properties/${property.id}`}
          key={i}
        >
          <div>
            <PropertyImageCarousel images={property.images} />
          </div>
          <div className="flex gap-1.5  flex-col w-[350px] md:w-full mx-auto  px-8 py-4">
            <p className="text-base lg:text-xl font-semibold lg:pr-3">
              {formatCurrency(property.price)}
            </p>
            <p className="text-xl font-semibold">{property.title}</p>
            <p className="text-muted-foreground text-sm">
              {property.country}&#44; {property.city}
            </p>
            <p className=" hidden md:block text-sm">{property.description}</p>
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
