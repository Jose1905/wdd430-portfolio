"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const linkClassName = "rounded-sm border px-4 py-2 text-sm";
  const disabledClassName = "cursor-not-allowed opacity-50";

  return (
    <nav aria-label="Project pages" className="mt-8 flex items-center justify-center gap-4">
      {currentPage <= 1 ? (
        <span aria-disabled="true" className={`${linkClassName} ${disabledClassName}`}>
          Previous
        </span>
      ) : (
        <Link href={createPageURL(currentPage - 1)} className={linkClassName}>
          Previous
        </Link>
      )}
      <span aria-live="polite" className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage >= totalPages ? (
        <span aria-disabled="true" className={`${linkClassName} ${disabledClassName}`}>
          Next
        </span>
      ) : (
        <Link href={createPageURL(currentPage + 1)} className={linkClassName}>
          Next
        </Link>
      )}
    </nav>
  );
}