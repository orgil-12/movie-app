import { ArrowRight } from "lucide-react";
import { options } from "../constants/api";
import { Movie } from "../constants/types";
import MovieCard from "./MovieCard";
import Link from "next/link";

type Props = {
  title: string;
  endpoint: string;
};

export default async function Section({ title, endpoint }: Props) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
    options
  );
  const resJson = await res.json();
  const movies: Movie[] = resJson.results.slice(0, 10);
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">{title}</h1>
        <Link
          href={endpoint}
          className="flex gap-2 px-4 py-2 text-xs items-center hover:underline"
        >
          See more <ArrowRight width="9.33px" />
        </Link>
      </div>
      <div className="gap-5 grid grid-cols-2">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie}  />
          </div>
        ))}
      </div>
    </div>
  );
}
