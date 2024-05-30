"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HomepageBestPropertiesCarousel({
  images,
}: {
  images: string[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      onSelect();
    }
  }, [emblaApi]);

  const handleDotClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <>
      <Carousel
        className="w-[300px] lg:w-[400px] mx-auto "
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="rounded-2xl ">
                <CardContent className="p-0 flex aspect-square items-center justify-center ">
                  <div className="relative w-full h-full ">
                    <Image
                      className="rounded-2xl"
                      src={image}
                      alt={`Slide ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${
              i === currentSlide ? "bg-black" : "bg-black/20"
            }`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </>
  );
}
