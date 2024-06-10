import { memo } from "react";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { formatCurrency } from "@/lib/utils";
import { Image } from "@prisma/client";
import PropertyImage from "@/components/properties/property-image";
import PropertyImageCarousel from "@/components/properties/property-image-carousel";
import { PropertyWithImagesType } from "@/lib/types";
import PropertyContactForm from "./property-contact-form";
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
    id,
    city,
    title,
    type,
    country,
    price,
    numberBedrooms,
    numberBathrooms,
    description,
    createdAt,
    updatedAt,
    images,
  } = property;
  return (
    <section className="pt-[150px] max-w-5xl xl:max-w-6xl mx-auto px-4 grid gap-4 grid-cols-12 py-12">
      <div className="space-y-2 col-span-12 sm:col-span-5">
        <div>
          <div className="sm:hidden mb-5">
            <PropertyImageCarousel images={images} />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {country}, {city}
          </p>
        </div>
        <p className="text-base font-semibold">{formatCurrency(price)}</p>
        {/* BEDROOMS, BATHROOMS */}
        <div className="flex   gap-12">
          <div className="flex items-center flex-col ">
            <span className="text-4xl">
              <IoBedOutline />
            </span>
            <span className="font-semibold">{numberBedrooms}</span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-4xl">
              <PiBathtub />
            </span>
            <span className="font-semibold">{numberBathrooms}</span>
          </div>
        </div>
        {/* DESCRIPTION */}
        <p>{description}</p>
        <div className="pt-4 space-y-3">
          <h2 className="text-3xl  tracking-tight">Contact us</h2>
          <PropertyContactForm />
        </div>
      </div>
      <div className="hidden sm:col-span-7  sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {images.map((image: Image, index: number) => (
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
