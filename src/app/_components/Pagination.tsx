"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PageInfo } from "../constants/types";

const getVisiblePage = (currentPage: number, lastPage: number, total_pages: number) => {
  let visiblePage = [];
  if(total_pages > 2) {
    if (currentPage === 1) {
      visiblePage = [1, 2, 3, 4, 5];
    } else if (currentPage >= lastPage - 2) {
      visiblePage = [
        lastPage - 4,
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ];
    } else {
      visiblePage = [
        currentPage,
        currentPage + 1,
        currentPage+2,
        currentPage + 3,
        currentPage + 4,
      ];
    }
  } else { visiblePage = [1, 2];}
  return visiblePage;
};

export const PaginationComp = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };
  const lastPage = pageInfo.totalPage > 500 ? 500 : pageInfo.totalPage;
  const visiblePage = getVisiblePage(pageInfo.currentPage, lastPage,  pageInfo.totalPage);
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {pageInfo.currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onChangePage(pageInfo.currentPage - 1)}
              />
            </PaginationItem>
          )}

          {visiblePage.map((page) => page !== visiblePage[2] && page !==visiblePage[3] ? (
                <PaginationItem key={'pagination'+page}>
                  <PaginationLink
                    isActive={page === pageInfo.currentPage}
                    onClick={() => onChangePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : '.' )}
          {/* ))} */}
          {pageInfo.currentPage !== pageInfo.totalPage && (<PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onChangePage(pageInfo.currentPage + 1)}
            />
          </PaginationItem>)}
          
        </PaginationContent>
      </Pagination>
    </div>
  );
};
