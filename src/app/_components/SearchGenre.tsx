"use client";
import { useEffect, useState } from "react";
import { Genre } from "../constants/types";
import { options } from "../constants/api";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export const SearchGenre = () => {
  const [genres, setGenres] = useState<Genre[]>();
  const searchParams = useSearchParams();
  const genreName = searchParams.get("genre_name");
  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        options
      );
      const resJson = await response.json();
      setGenres(resJson.genres);
    }
    fetchGenres();
  }, [genres]);
  return (
    <div className="flex flex-col gap-5 md:flex-wrap xl:w-[387px]">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Genres</h1>
        <h3 className="">Select a genre to see movies</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {genres?.map((genre) =>
          genreName === genre.name ? (
            <Badge
              className={`rounded-full flex gap-2 justify-between pr-1`}
              key={genre?.id}
            >
              {genre?.name}
              <Link href="/">
                <X size={14} />
              </Link>
            </Badge>
          ) : (
            <Link
              href={`/discover?with_genres=${genre?.id}&genre_name=${genre?.name}&page=1`}
              key={genre?.id}
            >
              <Badge
                variant="outline"
                className={`rounded-full flex gap-2 justify-between pr-1`}
              >
                {genre?.name}
                <ChevronRightIcon size={14} />
              </Badge>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
