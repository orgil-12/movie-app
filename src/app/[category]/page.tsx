"use client";
import { Movie, PageInfo } from "../constants/types";
import { options } from "../constants/api";
import MovieCard from "../_components/MovieCard";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PaginationComp } from "../_components/Pagination";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [movies, setMovies] = useState<Movie[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: 0,
    currentPage: 0,
  });
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        options
      );
      const resJson = await response.json();
      setMovies(resJson.results);
      setPageInfo({
        totalPage: resJson.total_pages,
        currentPage: Number(page),
      });
    }
    fetchMovies();
  }, [params.category, page]);
  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold capitalize ">{params.category}</h1>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies?.map((movie) => (
          <span key={"movie" + movie.id}>
            <MovieCard movie={movie} />
          </span>
        ))}
      </div>
      {pageInfo.totalPage > 1 && <PaginationComp pageInfo={pageInfo} />}
    </div>
  );
}
