"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { options } from "@/app/constants/api";
import MovieCard from "@/app/_components/MovieCard";
import { Movie } from "@/app/constants/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  const params = useParams();
  const [recData, setRecData] = useState<Movie[]>();
  useEffect(() => {
    async function fetchDiscoverByGenre() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params?.id}/recommendations`,
        options
      );

      const resJson = await response.json();
      setRecData(resJson.results);
    }

    fetchDiscoverByGenre();
  }, []);
  return (
    <div>
      <div className="p-5 flex flex-col gap-5 sm:px-[40px] md:px-[60px] lg:px-[80px]">
        <h1 className="text-2xl font-semibold ">More like this</h1>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {recData?.map((movie) => (
            <span key={movie.id}>
              <MovieCard movie={movie} />
            </span>
          ))}
        </div>
      </div>
      <Pagination className="px-5 flex gap-3 items-center justify-end">
        <ChevronLeft size={12} color="gray" />
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" className="border">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
        <ChevronRight size={12} />
      </Pagination>
    </div>
  );
}
