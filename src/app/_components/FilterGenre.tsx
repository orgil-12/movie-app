"use client";
import { useEffect, useState } from "react";
import { options } from "../constants/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Genre } from "../constants/types";
import Link from "next/link";
import { ChevronDown, ChevronRightIcon } from "lucide-react";

export const FilterGenre = ({
  setIsSearching,
  name,
}: {
  setIsSearching: (isSearching: boolean) => void;
  name: string;
}) => {
  const [genres, setGenres] = useState<Genre[]>();
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
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="px-2 py-4"
        >
          <ChevronDown />
          {name}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-4 md:w-[500px]">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Genres</h1>
          <h2 className="">See list of movies by genre</h2>
        </div>
        <div className="border"></div>
        <div className="flex gap-3 flex-wrap">
          {genres?.map((genre) => (
            <Link
              href={`/discover?with_genres=${genre?.id}&genre_name=${genre?.name}&page=1`}
              key={genre?.id}
            >
              <Badge
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setIsSearching(false);
                }}
                className={`rounded-full flex gap-2 justify-between pr-1`}
              >
                {genre?.name}
                <ChevronRightIcon size={14} />
              </Badge>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
