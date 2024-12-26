"use client";
import { options } from "@/app/constants/api";
import { useEffect } from "react";
import { useState } from "react";
import { Credits, Movie } from "@/app/constants/types";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function Page() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [movieCredits, setMovieCredits] = useState<Credits>();
  const isAdult = movieDetails?.adult ? "SG" : "PG";
  const movieTime = movieDetails?.runtime ?? 0;
  const hours = Math.floor(movieTime / 60);
  const min = movieTime % 60;
  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params?.id}`,
        options
      );
      const resJson = await response.json();
      setMovieDetails(resJson);
    }
    fetchMovie();
  }, []);
  useEffect(() => {
    async function fetchCredits() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params?.id}/credits`,
        options
      );
      const resJson = await response.json();
      setMovieCredits(resJson);
    }
    fetchCredits();
  }, []);
  return (
    <div className="pt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="px-5 flex gap-10">
            <div>
              <h3 className="text-2xl font-semibold">{movieDetails?.title}</h3>
              <p className="text-sm">
                {movieDetails?.release_date} • {isAdult} • {hours}h {min}min{" "}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Star color="#FDE047" fill="#FDE047" width="20px" height="20px" />
              <p className="flex flex-col text-sm">
                <span className="after:content-['/10'] after:text-muted-foreground ">
                  {movieDetails?.vote_average.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  {movieDetails?.vote_count}
                </span>
              </p>
            </div>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path}`}
            alt={movieDetails?.title}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex px-5 gap-[34px]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
              className="w-[100px] h-[148px]"
            />
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                {movieDetails?.genres?.map((genre) => (
                  <Badge
                    key={genre?.id}
                    variant="outline"
                    className="border rounded-full "
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <div className="w-[201px]">{movieDetails?.overview}</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 px-5 ">
            <div className="flex gap-[53px] items-center border-b pb-5">
              <h4 className="font-semibold">Director</h4>
              <div className="flex flex-wrap gap-1">
                {movieCredits?.crew
                  .filter((crew) => crew.department === "Directing")
                  .map((crew, index, array) => (
                    <>
                      <p key={crew.id}>{crew.name}</p>
                      {index !== array.length - 1 ? <span>·</span> : null}
                    </>
                  ))}
              </div>
            </div>
            <div className="flex gap-[53px] items-center border-b pb-5">
              <h4 className="font-semibold">Writers</h4>
              <div className="flex flex-wrap gap-1">
                {movieCredits?.crew
                  .filter((crew) => crew.department === "Writing")
                  .map((crew, index, array) => (
                    <>
                      <p key={crew.id}>{crew.name}</p>
                      {index !== array.length - 1 ? <span>·</span> : null}
                    </>
                  ))}
              </div>
            </div>
            <div className="flex gap-[53px] items-center border-b pb-5">
              <h4 className="font-semibold">Stars</h4>
              <div className="flex flex-wrap gap-1">
                {movieCredits?.cast.slice(0, 4).map((cast, index, array) => (
                  <>
                    <p key={cast.id}>{cast.name}</p>
                    {index !== array.length - 1 ? <span>·</span> : null}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
