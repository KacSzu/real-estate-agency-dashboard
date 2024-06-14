import { LuMapPin } from "react-icons/lu";

interface PropertyLocationProps {
  country: string;
  city: string;
}

const PropertyLocation = ({ country, city }: PropertyLocationProps) => (
  <p className="text-muted-foreground text-sm flex gap-1">
    <span className="text-xl text-emerald-700">
      <LuMapPin />
    </span>
    <span>
      {country}&#44; {city}
    </span>
  </p>
);

export default PropertyLocation;
