"use client";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import DashboardPropertiesTableHeader from "./dashboard-properties-table-header";
import DashboardPropertiesTableBody from "./dashboard-properties-table-body";
import { PropertyWithImagesType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FETCH_PER_PAGE_LIMIT } from "@/lib/constants";
import { useRouter } from "next/navigation";

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

  const getPaginationItems = () => {
    const currentPageNumber = +currentPage;
    let pages = [];

    if (totalPages <= 3) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPageNumber <= 2) {
        pages = [1, 2, "...", totalPages];
      } else if (currentPageNumber >= totalPages - 1) {
        pages = [1, "...", totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPageNumber, "...", totalPages];
      }
    }

    return pages;
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(+currentPage - 1, 1))}
              />
            </PaginationItem>
            {getPaginationItems().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <span className="px-2 py-1 sm:px-3 sm:py-2">...</span>
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === +currentPage}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(+currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
export default memo(DashboardPropertiesTable);
