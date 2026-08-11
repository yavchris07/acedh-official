import type { Scrap } from "../utils/type";
import ScrappingCarousel from "./scrapping-carousel";

type scraptemProps = {
  scraps: Scrap[];
};

const TheyTrust = ({ scraps }: scraptemProps) => {
  return (
    <div className="bg-zinc-50 py-20">
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="flex items-center gap-2">
          <div className="w-1 h-10 bg-orange-900"></div>
          <h3 className="text-4xl font-bold text-gray-800 max-sm:text-2xl">
            Ils nous lisent
          </h3>
        </div>
        <div className="">
          <ScrappingCarousel scraps={scraps} />
        </div>
        <span className="text-sm text-orange-900 italic my-4">
           
          Plus de {scraps.length} médias nous lisent à travers le monde
        </span>
      </div>
    </div>
  );
};

export default TheyTrust;
