"use client";
import { Suspense, useEffect, useState } from "react";
import { Movie, PageInfo } from "../constants/types";
import { options } from "../constants/api";
import { useSearchParams } from "next/navigation";
import { PaginationComp } from "../_components/Pagination";
import MovieCard from "../_components/MovieCard";
import { SearchGenre } from "../_components/SearchGenre";


export const Loading = ()=> (<div>Loading</div>)
export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: 0,
    currentPage: 0,
  });
  const [totalResults, setTotalResults] = useState<number>(0);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  useEffect(() => {
    async function fetchGenreMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`,
        options
      );
      const resJson = await response.json();
      setMovies(resJson.results);
      setPageInfo({
        totalPage: resJson.total_pages,
        currentPage: resJson.page,
      });
      setTotalResults(resJson.total_results);
    }
    fetchGenreMovies();
  }, [query, page]);
  if (!movies) {
    return <Loading />
  }
  return (
<Suspense fallback={<Loading />}>
<div className="flex flex-col pt-8 gap-8 xl:grid xl:grid-cols-[auto,auto,auto] px-5 py-8 sm:px-[40px] md:px-[60px] lg:px-[80px] ">
      <h1 className="font-semibold text-2xl xl:col-span-3 ">Search results</h1>
      <div className="flex flex-col gap-5 xl:col-span-2 xl:border-r xl:pr-8  ">
        <h1 className="text-xl font-bold  ">
          {totalResults} results for "{query}"
        </h1>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
          {movies?.map((movie) => (
            <span key={"movie" + movie.id}>
              <MovieCard movie={movie} />
            </span>
          ))}
        </div>
      {pageInfo.totalPage > 1 && <PaginationComp pageInfo={pageInfo} />}
      </div>
      <SearchGenre />
    </div>
</Suspense>
  );
}
