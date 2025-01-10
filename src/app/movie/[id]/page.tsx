"use client";
import { options } from "@/app/constants/api";
import { useEffect } from "react";
import { useState } from "react";
import { Credits, Movie } from "@/app/constants/types";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import MoreLikeThis from "@/app/_components/MoreLikeThis";
import { MobileDetail } from "@/app/_components/MobileMovieDetails";
import { DesktopDetail } from "@/app/_components/DesktopMovieDetails";

export default function Page() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [movieCredits, setMovieCredits] = useState<Credits>();
  const isAdult = movieDetails?.adult ? "R" : "PG";
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
  }, [params?.id]);
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
  }, [params?.id]);
  console.log(movieDetails)

  return (
    <div>
      <div className="sm:hidden ">
        {movieDetails && movieCredits && (
          <MobileDetail
            movieDetails={movieDetails}
            movieCredits={movieCredits}
            isAdult={isAdult}
            hours={hours}
            min={min}
          />
        )}
      </div>
      <div className="hidden sm:block" >
        {movieDetails && movieCredits && (
          <DesktopDetail
            movieDetails={movieDetails}
            movieCredits={movieCredits}
            isAdult={isAdult}
            hours={hours}
            min={min}
          />
        )}
      </div>
    </div>
  );
}
