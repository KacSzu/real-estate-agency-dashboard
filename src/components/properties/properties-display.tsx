import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface IPropertiesDisplay {
  filteredProperties: PropertyWithImagesType[];
}

function PropertiesDisplay({ filteredProperties }: IPropertiesDisplay) {
  return (
    <section className="">
      <div className="grid grid-cols-12  gap-3">
        {filteredProperties.map((property, i) => (
          <Link
            className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center cursor-pointer"
            href={`/properties/${property.id}`}
            key={i}
          >
            <Image
              src={property.images[0].imageSrc as string}
              alt="image"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl object-cover"
              style={{ width: "350px", height: "300px" }}
            />
            <div className="flex items-center justify-between w-[400px] px-8 py-4">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-base ">{formatCurrency(property.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(PropertiesDisplay);
