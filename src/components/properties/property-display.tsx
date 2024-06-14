"use client";
import { memo } from "react";
import { formatCurrency } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import PropertyImage from "@/components/properties/property-image";
import PropertyImageCarousel from "@/components/properties/property-image-carousel";
import { PropertyWithImagesType } from "@/lib/types";
import PropertyContactForm from "./property-contact-form";
import PropertyStats from "./property-stats";
import PropertyLocation from "./property-location";
import Image from "next/image";
import PropertyBadges from "./property-badges";

interface IPropertyDisplay {
  property: PropertyWithImagesType;
}

const getColSpan = (index: number) => {
  switch (index) {
    case 0:
    case 3:
      return "col-span-1 sm:col-span-2 lg:col-span-4";
    default:
      return "col-span-2";
  }
};

function PropertyDisplay({ property }: IPropertyDisplay) {
  const {
    city,
    title,
    country,
    price,
    numberBedrooms,
    numberBathrooms,
    description,
    images,
    squares,
    numberRooms,
  } = property;

  return (
    <section className="pt-[150px] max-w-5xl xl:max-w-6xl mx-auto px-4 grid gap-4 grid-cols-12 py-12 relative">
      <Image
        src="/svg/svg7.svg"
        alt="svg"
        width={450}
        height={450}
        className=" -left-40 -top-30 absolute opacity-70 z-[-10]"
      />
      <Image
        src="/svg/svg6.svg"
        alt="svg"
        width={450}
        height={450}
        className="hidden xl:block -top-20 opacity-70 -right-20 absolute z-[-10]"
      />
      <div className="space-y-2 col-span-12 sm:col-span-6">
        <div className="sm:hidden mb-5">
          <PropertyImageCarousel images={images} />
        </div>
        <div className="space-y-3">
          <PropertyBadges property={property} />
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          <PropertyLocation country={country} city={city} />
          <p className="flex gap-1 items-center">
            <span className="text-xl font-semibold">
              {formatCurrency(price)}
            </span>
          </p>
          <PropertyStats
            squares={squares}
            numberRooms={numberRooms}
            numberBedrooms={numberBedrooms}
            numberBathrooms={numberBathrooms}
          />
        </div>
        <p>{description}</p>
        <div className="pt-4 space-y-3">
          <h2 className="text-3xl tracking-tight">Contact us</h2>
          <PropertyContactForm />
        </div>
      </div>
      <div className="hidden sm:col-span-6 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {images.map((image: ImageType, index: number) => (
          <PropertyImage
            key={image.id}
            src={image.imageSrc}
            alt="Property Image"
            colSpan={getColSpan(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(PropertyDisplay);
