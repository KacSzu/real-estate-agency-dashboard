import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { Image as ImageType, Property } from "@prisma/client";
import Image from "next/image";

interface PropertyWithImages extends Property {
  images: ImageType[];
}
interface IDashboardPropertiesTable {
  properties: PropertyWithImages[];
}
export default function DashboardPropertiesTable({
  properties,
}: IDashboardPropertiesTable) {
  console.log(properties);

  return (
    <Table>
      <TableHeader>
        <TableRow className="tracking-tight text-sm font-medium ">
          <TableHead className="w-[150px] ">Property Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Type</TableHead>
          <TableHead className="text-right">Country</TableHead>
          <TableHead className="text-right">City</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Listed At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => {
          const formatedDate = formatDateToDDMMYYYY(property.createdAt);
          return (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                {property.images.length > 0 ? (
                  <div className="relative w-32 h-32 shadow-2xl overflow-hidden rounded-xl">
                    <Image
                      className=""
                      src={property.images[0].thumbnailSrc}
                      alt={property.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  "No image"
                )}
              </TableCell>
              <TableCell className="text-sm font-semibold tracking-tight">
                {property.title}
              </TableCell>
              <TableCell className="text-right text-sm font-semibold tracking-tight">
                {property.type}
              </TableCell>
              <TableCell className="text-right text-sm font-semibold tracking-tight">
                {property.country}
              </TableCell>
              <TableCell className="text-right text-sm font-semibold tracking-tight">
                {property.city}
              </TableCell>
              <TableCell className="text-right text-sm font-semibold tracking-tight">
                ${property.price}
              </TableCell>
              <TableCell className="text-right text-sm font-semibold tracking-tight">
                {formatedDate}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
