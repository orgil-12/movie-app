"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { options } from "@/app/constants/api";
import MovieCard from "@/app/_components/MovieCard";
import { Movie, PageInfo } from "@/app/constants/types";
import { PaginationComp } from "@/app/_components/Pagination";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [recData, setRecData] = useState<Movie[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({
      totalPage: 0,
      currentPage: 0,
    });
  useEffect(() => {
    async function fetchDiscoverByGenre() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params?.id}/recommendations?page=${page}`,
        options
      );
      const resJson = await response.json();
      setRecData(resJson.results);
      setPageInfo({ totalPage: resJson.total_pages, currentPage: Number(page) });
    }

    fetchDiscoverByGenre();
  }, [page]);
  return (
    <div>
      <div className="p-5 flex flex-col gap-5 sm:px-[40px] md:px-[60px] lg:px-[80px]">
        <h1 className="text-2xl font-semibold ">More like this</h1>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {recData?.map((movie) => (
            <span key={"recData"+movie.id}>
              <MovieCard movie={movie} />
            </span>
          ))}
        </div>
      </div>
      <PaginationComp pageInfo={pageInfo} />
    </div>
  );
}
