import { Star } from "lucide-react";
import { Movie } from "../constants/types";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {  
  return (
    <Link href={`/movie/${movie.id}`}>
    <div className={`bg-bgColor rounded-lg`} key={movie.id}>
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
          <span className="after:content-['/10'] after:text-muted-foreground ">{movie.vote_average.toFixed(1)}</span>
        </div>
        <h2>{movie.title}</h2>
      </div>
    </div>
    </Link> 
  );
}
