"use client";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import DashboardPropertiesTableHeader from "./dashboard-properties-table-header";
import DashboardPropertiesTableBody from "./dashboard-properties-table-body";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface IDashboardPropertiesTable {
  properties: PropertyWithImagesType[];
}
export default function DashboardPropertiesTable({
  properties,
}: IDashboardPropertiesTable) {
  const totalValue = properties.reduce(
    (sum, property) => sum + property.price,
    0
  );
  return (
    <Table>
      <DashboardPropertiesTableHeader />
      <DashboardPropertiesTableBody properties={properties} />
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total</TableCell>
          <TableCell className="text-right">
            {formatCurrency(totalValue)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
