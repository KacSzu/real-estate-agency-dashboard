"use client";
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
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "sonner";

interface IDashboardUsersTableBody {
  users: User[];
}

function DashboardUsersTableBody({ users }: IDashboardUsersTableBody) {
  const router = useRouter();

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("User deleted successfully.");
        router.refresh();
      } else {
        toast.error("Failed to delete user");
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <TableBody>
      {users.map((user) => {
        const formatedDate = formatDateToDDMMYYYY(user.createdAt);
        return (
          <TableRow key={user.id}>
            <TableCell className="text-sm font-semibold tracking-tight">
              {user.email}
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
                      <AlertDialogAction onClick={() => deleteUser(user.id)}>
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

export default DashboardUsersTableBody;
