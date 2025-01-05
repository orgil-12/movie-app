import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import MoreLikeThis from "./MoreLikeThis";
import { Credits, Movie } from "../constants/types";

type Details = {
  movieDetails: Movie;
  movieCredits: Credits;
  isAdult: string;
  hours: number;
  min: number;
};

export const DesktopDetail = ({
  movieDetails,
  movieCredits,
  isAdult,
  hours,
  min,
}: Details) => {
  return (
    <div className="xl:px-[60px] py-8 grid gap-4">
      <div className="flex flex-col gap-6 ">
        <div className="pr-4 flex w-full justify-between gap-10">
          <div>
            <h3 className="text-2xl font-semibold">{movieDetails?.title}</h3>
            <p className="text-sm">
              {movieDetails?.release_date} • {isAdult} • {hours}h {min}min{" "}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium">Rating</h3>
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
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
          alt={movieDetails?.title}
        />
      </div>
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
        <div className="">{movieDetails?.overview}</div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-[53px] items-center border-b pb-5">
          <h4 className="font-semibold">Director</h4>
          <div className="flex flex-wrap gap-1">
            {movieCredits?.crew
              .filter((crew) => crew.department === "Directing")
              .map((crew, index, array) => (
                <span key={`directing` + crew.id} className="flex gap-1">
                  <p>{crew.name}</p>
                  {index !== array.length - 1 ? <span>·</span> : null}
                </span>
              ))}
          </div>
        </div>
        <div className="flex gap-[53px] items-center border-b pb-5">
          <h4 className="font-semibold">Writers</h4>
          <div className="flex flex-wrap gap-1">
            {movieCredits?.crew
              .filter((crew) => crew.department === "Writing")
              .map((crew, index, array) => (
                <span key={`writing` + index} className="flex flex-wrap gap-1">
                  <p>{crew.name}</p>
                  {index !== array.length - 1 ? <span>·</span> : null}
                </span>
              ))}
          </div>
        </div>
        <div className="flex gap-[53px] items-center border-b pb-5">
          <h4 className="font-semibold">Stars</h4>
          <div className="flex flex-wrap gap-1">
            {movieCredits?.cast.slice(0, 4).map((cast, index, array) => (
              <span key={`stars` + cast.id} className="flex flex-wrap gap-1">
                <p>{cast.name}</p>
                {index !== array.length - 1 ? <span>·</span> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
      <MoreLikeThis movieDetails={movieDetails} slice={5} />
    </div>
  );
};
