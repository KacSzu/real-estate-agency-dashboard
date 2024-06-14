import Link from "next/link";
import { Badge } from "../../ui/badge";
import { formatCurrency } from "@/lib/utils";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { PropertyWithImagesType } from "@/lib/types";
import Image from "next/image";

interface IHomepagePropertiesDisplayCard {
  property: PropertyWithImagesType;
  className: string;
  style?: any;
}

const HomepagePropertiesDisplayCard = ({
  property,
  className,
  style,
}: IHomepagePropertiesDisplayCard) => (
  <Link
    href={`/properties/${property.id}`}
    className={`bg-cover relative bg-center rounded-xl shadow-xl ${className}`}
    style={{
      ...style,
    }}
  >
    <Image
      src={property.images[0].imageSrc}
      alt={property.title}
      layout="fill"
      objectFit="cover"
      quality={85}
      className="rounded-xl z-[-5]"
    />
    <div className="bg-black bg-opacity-50 p-4 rounded-lg h-full flex flex-col justify-end">
      <h1 className="text-4xl font-bold text-white">{property.title}</h1>
      <p className="text-white mt-2">{property.description.slice(0, 200)}...</p>
      <div className="flex gap-2 mt-4 flex-wrap">
        <Badge className="bg-emerald-600 hover:bg-emerald-500">
          {property.type}
        </Badge>
        <Badge className="bg-neutral-700 hover:bg-neutral-600">
          {formatCurrency(property.price)}
        </Badge>
        <Badge className="space-x-3 bg-sky-600 hover:bg-sky-500">
          <div className="flex gap-1">
            <IoBedOutline className="h-4 w-4" />
            {property.numberBedrooms}
          </div>
          <div className="flex gap-1">
            <PiBathtub className="h-4 w-4" />
            {property.numberBathrooms}
          </div>
        </Badge>
      </div>
    </div>
  </Link>
);

export default HomepagePropertiesDisplayCard;
