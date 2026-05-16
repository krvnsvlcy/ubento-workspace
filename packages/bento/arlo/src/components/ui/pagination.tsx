import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Pagination as CorePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../core/ui/pagination.js";
import * as React from "react";

export const Pagination = createComponent({
  props: z.object({
    currentPage: z.number().default(1),
    totalPages: z.number().default(1),
    siblingCount: z.number().default(1),
  }),

  events: z.object({
    pageChange: z.object({ page: z.number() }),
  }),

  summary: "A pagination component for navigating pages.",
  instructions: [
    "Use this component to navigate between pages of data.",
    "The `currentPage` prop sets the active page.",
    "The `totalPages` prop sets the total number of pages.",
    "The `pageChange` event is emitted when a page is clicked.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    const { currentPage, totalPages, siblingCount } = props;

    const getPageRange = () => {
      const range: number[] = [];
      const leftSibling = Math.max(currentPage - siblingCount, 1);
      const rightSibling = Math.min(currentPage + siblingCount, totalPages);

      for (let i = leftSibling; i <= rightSibling; i++) {
        range.push(i);
      }
      return range;
    };

    const pages = getPageRange();

    return (
      <CorePagination ref={ref}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  emit("pageChange", { page: currentPage - 1 });
                }
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => emit("pageChange", { page: 1 })}>
                  1
                </PaginationLink>
              </PaginationItem>
              {pages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => emit("pageChange", { page })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => emit("pageChange", { page: totalPages })}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) {
                  emit("pageChange", { page: currentPage + 1 });
                }
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </CorePagination>
    );
  },
});
