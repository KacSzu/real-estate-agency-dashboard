import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency, formatDateToDDMMYYYY } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "sonner";

interface IDashboardPropertiesTableBody {
  properties: PropertyWithImagesType[];
}

function DashboardPropertiesTableBody({
  properties,
}: IDashboardPropertiesTableBody) {
  const router = useRouter();

  const deleteProperty = async (id: number) => {
    try {
      const response = await fetch(`/api/properties?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Successfully deleted property");
        router.refresh();
      } else {
        toast.error("Could not delete property");
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Failed to delete property", error);
    }
  };

  return (
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
              {formatCurrency(+property.price)}
            </TableCell>
            <TableCell className="text-right text-sm font-semibold tracking-tight">
              {formatedDate}
            </TableCell>
            <TableCell className="text-right text-sm font-semibold tracking-tight">
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button>
                      <HiOutlineTrash className="ml-4 h-5 w-5 cursor-pointer" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your property and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProperty(property.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default DashboardPropertiesTableBody;
