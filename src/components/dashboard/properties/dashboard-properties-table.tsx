"use client";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import DashboardPropertiesTableHeader from "./dashboard-properties-table-header";
import DashboardPropertiesTableBody from "./dashboard-properties-table-body";
import { PropertyWithImagesType } from "@/lib/types";

interface IDashboardPropertiesTable {
  properties: PropertyWithImagesType[];
}
export default function DashboardPropertiesTable({
  properties,
}: IDashboardPropertiesTable) {
  return (
    <Table>
      <DashboardPropertiesTableHeader />
      <DashboardPropertiesTableBody properties={properties} />
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
