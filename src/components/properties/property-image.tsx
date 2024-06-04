import Image from "next/image";
import { memo } from "react";

interface PropertyImageProps {
  src: string;
  alt: string;
  colSpan: string;
}

const PropertyImage: React.FC<PropertyImageProps> = ({ src, alt, colSpan }) => {
  return (
    <div className={`${colSpan} w-full h-full`}>
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-2xl shadow-xl"
      />
    </div>
  );
};

export default memo(PropertyImage);
