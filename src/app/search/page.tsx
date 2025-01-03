"use client";
import { useEffect, useState } from "react";
import { Movie, PageInfo } from "../constants/types";
import { options } from "../constants/api";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { PaginationComp } from "../_components/Pagination";
import MovieCard from "../_components/MovieCard";
import { SearchGenre } from "../_components/SearchGenre";

export default function Page() {
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: 0,
    currentPage: 0,
  });
  const [totalResults, setTotalResults] = useState<number>(0);
  const searchParams = useSearchParams();
  const genreId = searchParams.get("with_genres");
  const page = searchParams.get("page");
  const genreName = searchParams.get("genre_name");
  useEffect(() => {
    async function fetchGenreMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`,
        options
      );
      const resJson = await response.json();
      setGenreMovies(resJson.results);
      setPageInfo({
        totalPage: resJson.total_pages,
        currentPage: resJson.page,
      });
      setTotalResults(resJson.total_results);
    }
    fetchGenreMovies();
  }, [genreId, page]);
  return (
    <div className="flex flex-col pt-8 gap-8 px-5 sm:px-[40px] md:px-[60px] lg:px-[80px]">
      <h1 className="font-semibold text-2xl">Search filter</h1>
      <SearchGenre />
      <div className="flex flex-col gap-5 ">
        <h1 className="text-xl font-bold  ">
          {totalResults} titles in "{genreName}"
        </h1>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-5">
          {genreMovies?.map((movie) => (
            <span key={"movie" + movie.id}>
              <MovieCard movie={movie} />
            </span>
          ))}
        </div>
        <div className="">
          <PaginationComp pageInfo={pageInfo} />
        </div>
      </div>
    </div>
  );
}
