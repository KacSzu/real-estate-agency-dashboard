import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function DashboardUsersTableHeader() {
  return (
    <TableHeader>
      <TableRow className="tracking-tight text-sm font-medium ">
        <TableHead className="w-[150px] ">Email</TableHead>
        <TableHead className="text-right">Created At</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default DashboardUsersTableHeader;
