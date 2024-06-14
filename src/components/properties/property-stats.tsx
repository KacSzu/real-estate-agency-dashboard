import { memo } from "react";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub, PiSquaresFour } from "react-icons/pi";
import { TiArrowMaximise } from "react-icons/ti";

interface PropertyStatsProps {
  squares: number;
  numberRooms: number;
  numberBedrooms: number;
  numberBathrooms: number;
}

const PropertyStats = ({
  squares,
  numberRooms,
  numberBedrooms,
  numberBathrooms,
}: PropertyStatsProps) => (
  <div className="flex justify-start text-center gap-4 sm:gap-6">
    <div className="flex items-center flex-col">
      <span className="text-2xl">
        <TiArrowMaximise />
      </span>
      <span className="font-semibold text-xs">{squares} Squares</span>
    </div>
    <div className="flex items-center flex-col">
      <span className="text-2xl">
        <PiSquaresFour />
      </span>
      <span className="font-semibold text-xs">{numberRooms} Rooms</span>
    </div>
    <div className="flex items-center flex-col">
      <span className="text-2xl">
        <IoBedOutline />
      </span>
      <span className="font-semibold text-xs">{numberBedrooms} Bedrooms</span>
    </div>
    <div className="flex items-center flex-col">
      <span className="text-2xl">
        <PiBathtub />
      </span>
      <span className="font-semibold text-xs">{numberBathrooms} Bathrooms</span>
    </div>
  </div>
);

export default memo(PropertyStats);
