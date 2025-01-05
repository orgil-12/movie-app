"use client";
import { useEffect, useState } from "react";
import { Movie } from "../constants/types";
import { options } from "../constants/api";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SearchResultList = ({
  searchValue,
  setSearchValue,
  setIsSearching,
}: {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setIsSearching: (isSearching: boolean) => void;
}) => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=1`,
        options
      );
      const resJson = await response.json();
      setMovies(resJson.results.slice(0, 5));
      console.log(resJson.results.slice(0, 5));
    };
    fetchMovies();
  }, [searchValue]);
  return (
    <div className="bg-background absolute border rounded-lg p-3  top-[90px] left-0 w-[335px] sm:w-[400px] xl:w-[577px]">
      {movies?.map((movie) => (
        <div key={"search" + movie.id}>
          <Link href={`/movie/${movie.id}`}>
            <div
              className={`flex p-2 gap-4`}
              onClick={() => {
                setSearchValue("");
                setIsSearching(false);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg h-[100px] "
              />
              <div className="flex w-full flex-col gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <div className="flex gap-1 items-center">
                    <Star
                      color="#FDE047"
                      fill="#FDE047"
                      width="13.33px"
                      height="12.68px"
                    />
                    <span className="after:content-['/10'] after:text-muted-foreground ">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h3>{movie?.release_date.slice(0, 4)}</h3>
                  <Button
                    variant="outline"
                    className="border-none flex items-center gap-1"
                  >
                    See more
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
          <div className="border-[.2px] "></div>
        </div>
      ))}
      <Link
        href={`/search?query=${searchValue}&page=1`}
        onClick={() => {
          setSearchValue("");
          setIsSearching(false);
        }}
      >
        <div className="pt-2 px-4 text-sm font-medium">
          See all results for "{searchValue}"
        </div>
      </Link>
    </div>
  );
};
