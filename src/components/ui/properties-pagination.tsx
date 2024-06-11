import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PropertiesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PropertiesPagination: React.FC<PropertiesPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPaginationItems = () => {
    let pages = [];
    if (totalPages <= 3) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 2) {
        pages = [1, 2, "...", totalPages];
      } else if (currentPage >= totalPages - 1) {
        pages = [1, "...", totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>
        {getPaginationItems().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <span className="px-2 py-1 sm:px-3 sm:py-2">...</span>
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PropertiesPagination;
