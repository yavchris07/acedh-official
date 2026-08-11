import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScrapsCard from "./scraps-card";
import type { Scrap } from "../utils/type";

type scraptemProps = {
  scraps: Scrap[];
};

const ScrappingCarousel = ({ scraps }: scraptemProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false, // Continue de tourner même après un clic
        stopOnMouseEnter: true, // S'arrête quand on survole avec la souris
      }),
    ],
  );
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {scraps.map((scrap) => (
          <div
            key={scrap.id}
            className="flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
          >
            <ScrapsCard scraps={scrap} key={scrap.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrappingCarousel;
