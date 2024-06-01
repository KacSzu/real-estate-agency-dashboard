import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function DashboardPropertiesTableHeader() {
  return (
    <TableHeader>
      <TableRow className="tracking-tight text-sm font-medium ">
        <TableHead className="w-[150px] ">Property Image</TableHead>
        <TableHead>Title</TableHead>
        <TableHead className="text-right">Type</TableHead>
        <TableHead className="text-right">Country</TableHead>
        <TableHead className="text-right">City</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead className="text-right">Listed At</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default DashboardPropertiesTableHeader;
