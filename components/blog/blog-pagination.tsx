"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  pagination: {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export function BlogPagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || pagination.currentPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    router.push(`/blog?page=${page}`);
  };

  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={!pagination.hasPreviousPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={!pagination.hasNextPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
