"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";

export const CarouselComp = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const photos = ["wicked.png", "gladiator.png", "Moana.png"];
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem
            key={index}
            className=" w-full xl:h-[700px] bg-cover bg-center items-center justify-center"
          >
            <div
              className="bg-cover bg-center w-[100%] h-[700px]"
              style={{ backgroundImage: `url('/${photo}')` }}
            ></div>
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
