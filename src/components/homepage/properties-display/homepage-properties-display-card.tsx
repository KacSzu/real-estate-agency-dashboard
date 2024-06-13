import Link from "next/link";
import { Badge } from "../../ui/badge";
import { formatCurrency } from "@/lib/utils";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { PropertyWithImagesType } from "@/lib/types";
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
    className={`bg-cover bg-center rounded-xl shadow-xl ${className}`}
    style={{
      backgroundImage: `url('${property?.images[0]?.imageSrc}')`,
      ...style,
    }}
  >
    <div className="bg-black bg-opacity-50 p-4 rounded-lg h-full flex flex-col justify-end">
      <h1 className="text-4xl font-bold text-white">{property.title}</h1>
      <p className="text-white mt-2">{property.description.slice(0, 200)}...</p>
      <div className="flex gap-2 mt-4 flex-wrap">
        <Badge>{property.type}</Badge>
        <Badge className="bg-emerald-600 hover:bg-emerald-500">
          {formatCurrency(property.price)}
        </Badge>
        <Badge className="space-x-3 bg-neutral-600 hover:bg-neutral-500">
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
