import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) {
  const [pageInput, setPageInput] = useState("");

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageInput(event.target.value);
  };

  const handlePageInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(pageInput, 10);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onChangePage(pageNumber);
      } else {
        setPageInput("");
      }
    }
  };

  const goToFirstPage = () => {
    onChangePage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    onChangePage(totalPages);
  };

  return (
    <div className="flex items-center justify-between px-2 py-6">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-foreground font-medium text-xs">
            {currentPage}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
