"use client";
import Autoplay from "embla-carousel-autoplay";
import { Play } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CarouselComp = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const photos = [
    "https://image.tmdb.org/t/p/original/uKb22E0nlzr914bA9KyA5CVCOlV.jpg",
    "gladiator.png",
    "Moana.png",
  ];
  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index} className=" sm:relative">
            <div
              className={`w-[100%] h-[300px] sm:h-screen  bg-cover bg-center bg-[url('https://image.tmdb.org/t/p/original/uKb22E0nlzr914bA9KyA5CVCOlV.jpg')]`}
              // style={{ backgroundImage: `url('/${photo}')` }}
            ></div>
            <div className="px-5 py-3 w-full flex-col sm:w-auto sm:absolute sm:top-[500px] sm:left-[200px] sm:text-white ">
              <div className="flex sm:block w-full justify-between gap-4">
                <div>
                  <h3>Now playing:</h3>
                  <h3 className="text-2xl font-semibold">Wicked</h3>
                </div>
                <div className="flex gap-1 items-center ">
                  <Star
                    color="#FDE047"
                    fill="#FDE047"
                    width="20px"
                    height="20px"
                  />
                  <p className="text-sm">
                    <span className="after:content-['/10'] after:text-muted-foreground ">
                      7.3
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex overflow-auto w-[302px] mt-3">
                In the land of Oz, ostracized and misunderstood green-skinned
                Elphaba is forced to share a room with the popular aristocrat
                Glinda at Shiz University, and the two's unlikely friendship is
                tested as they begin to fulfill their respective destinies as
                Glinda the Good and the Wicked Witch of the West.
              </div>
              <div className="mt-3">
                <Link href="https://www.youtube.com/watch?v=6COmYeLsz4c&t=2s" >
                  <Button className="py-5">
                    <Play /> <h1>Watch Trailer</h1>{" "}
                  </Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
