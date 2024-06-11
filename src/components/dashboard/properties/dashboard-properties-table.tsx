"use client";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import DashboardPropertiesTableHeader from "./dashboard-properties-table-header";
import DashboardPropertiesTableBody from "./dashboard-properties-table-body";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { memo } from "react";
import { FETCH_PER_PAGE_LIMIT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import PropertiesPagination from "@/components/ui/properties-pagination";

interface IDashboardPropertiesTable {
  properties: PropertyWithImagesType[];
  currentPage: string | 1;
  totalProperties: number;
}
function DashboardPropertiesTable({
  properties,
  currentPage,
  totalProperties,
}: IDashboardPropertiesTable) {
  const router = useRouter();
  const totalPages = Math.ceil(totalProperties / FETCH_PER_PAGE_LIMIT);
  const totalValue = properties.reduce(
    (sum, property) => sum + property.price,
    0
  );

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/properties?page=${page}`);
  };

  return (
    <>
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
      {totalPages > 1 && (
        <PropertiesPagination
          currentPage={+currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
export default memo(DashboardPropertiesTable);
