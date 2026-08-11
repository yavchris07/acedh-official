import type { Partner } from "../utils/type";
import PartnerCarousel from "./Partner-carousel";

type partListProps = {
  partners: Partner[];
};

const PartnersList = ({ partners }: partListProps) => {
  return (
    <div className="bg-zinc-50 py-20">
      <div className="w-[70%] mx-auto max-sm:w-[97%]">
        <div className="flex items-center gap-2">
          <div className="w-1 h-10 bg-orange-900"></div>
          <h3 className="text-4xl font-bold text-gray-800 max-sm:text-2xl">
            Ils nous font confiance
          </h3>
        </div>
        <div className="mt-20">
          <PartnerCarousel partners={partners} />
        </div>
      </div>
    </div>
  );
};

export default PartnersList;
