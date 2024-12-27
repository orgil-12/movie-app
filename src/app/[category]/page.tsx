"use client";
import { Movie } from "../constants/types";
import { options } from "../constants/api";
import MovieCard from "../_components/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const [movies, setMovies] = useState<Movie[]>();
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=1`,
        options
      );

      const resJson = await response.json();
      setMovies(resJson.results);
    }
    fetchMovies();
  }, [params.category]);  
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-2xl font-bold capitalize ">{params.category}</h1>
      <div className="gap-5 grid grid-cols-2">
        {movies?.map((movie) => (
          <span key={movie.id}>
            <MovieCard movie={movie} />
          </span>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="border">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
