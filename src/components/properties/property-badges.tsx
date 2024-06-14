import { Badge } from "../ui/badge";
import { PropertyWithImagesType } from "@/lib/types";
import { isFresh } from "@/lib/utils";
import { memo } from "react";

interface PropertyBadgesProps {
  property: PropertyWithImagesType;
}

const PropertyBadges = ({ property }: PropertyBadgesProps) => (
  <div className="flex gap-1">
    <Badge className="w-fit bg-emerald-700 hover:bg-emerald-600">
      {property.type}
    </Badge>
    {isFresh(property.createdAt) && (
      <Badge className="w-fit bg-yellow-600 hover:bg-yellow-500">
        Fresh added
      </Badge>
    )}
  </div>
);

export default memo(PropertyBadges);
