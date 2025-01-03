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
import { ChevronRightIcon } from "lucide-react";

export const FilterGenre = () => {
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
      <Popover open={open} onOpenChange={()=>setOpen(!open)}>
        <PopoverTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="outline">Genre</Button>
        </PopoverTrigger>
       
          <PopoverContent className="flex gap-2 flex-wrap">
            {genres?.map((genre) => (
              <Link
                href={`/search?with_genres=${genre?.id}&genre_name=${genre?.name}&page=1`}
                key={genre?.id}
              >
                <Badge variant="outline" onClick={() => setOpen(false)} className={`rounded-full flex gap-2 justify-between pr-1`}>
                  {genre?.name}
                  <ChevronRightIcon size={14} />
                </Badge>
              </Link>
            ))}
          </PopoverContent>
       
      </Popover>
  );
};
