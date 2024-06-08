import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import DashboardUsersTableHeader from "./dashboard-users-table-header";
import { User } from "@prisma/client";
import DashboardPropertiesTableBody from "../properties/dashboard-properties-table-body";
import DashboardUsersTableBody from "./dashboard-users-table-body";
import { memo } from "react";
interface IDashboardUsersTable {
  users: User[];
}
function DashboardUsersTable({ users }: IDashboardUsersTable) {
  return (
    <Table>
      <DashboardUsersTableHeader />
      <DashboardUsersTableBody users={users} />
    </Table>
  );
}

export default memo(DashboardUsersTable);
