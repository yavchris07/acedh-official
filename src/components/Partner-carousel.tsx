import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import PartnerItem from "./partner";
import type { Partner } from "../utils/type";

type partnerItemProps = {
  partners: Partner[];
};
const PartnerCarousel = ({ partners }: partnerItemProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false, // Continue de tourner même après un clic
        stopOnMouseEnter: true, // S'arrête quand on survole avec la souris
      }),
    ],
  );
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6 items-center">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
          >
            {/* <ContributorCard user={partner} index={i} tProfile={labels.profile} /> */}
            <PartnerItem partner={partner} key={partner.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCarousel;
