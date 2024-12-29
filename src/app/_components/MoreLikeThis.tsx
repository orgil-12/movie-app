"use client";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { options } from "../constants/api";
import { Movie } from "../constants/types";
import { useEffect, useState } from "react";

export default function MoreLikeThis({
  movieDetails,
}: {
  movieDetails?: Movie;
}) {
  const [recData, setRecData] = useState<Movie[]>();

  useEffect(() => {
    async function fetchDiscoverByGenre() {
      if (!movieDetails) return;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieDetails?.id}/recommendations`,
        options
      );

      const resJson = await response.json();
      setRecData(resJson.results);
    }

    fetchDiscoverByGenre();
  }, [movieDetails]);
  return (
    <div id="moreLikethis" className="flex flex-col gap-8 px-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold ">More like this</h1>
        <Link
          href={`/recommendations/${movieDetails?.id}`}
          className="flex gap-2 px-4 py-2 text-xs items-center hover:underline"
        >
          See more <ArrowRight width="9.33px" />
        </Link>
      </div>
      <div>
        <div className="flex overflow-hidden gap-5">
          {recData?.slice(0, 2).map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className={`bg-bgColor rounded-lg`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-t-lg"
                />
                <div className="p-2">
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
                  <h2>{movie.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
