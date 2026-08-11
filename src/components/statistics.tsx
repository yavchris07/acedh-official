import { useStatistics } from "../features/statistics/hooks/use-statitics";
import Statistic from "./statistic";
// import { Stat } from "@/features/statistics/api";
// import { useStatistics } from "@/features/statistics/hooks/use-statitics";

const Statistics = () => {
  const { statistics, loading } = useStatistics();
  return (
    <div className="bg-green-900 h-40 max-sm:h-auto flex items-center ">
      <div className="w-[70%] mx-auto flex justify-between items-center max-sm:w-[97%] max-sm:flex-col max-sm:gap-4 max-sm:py-4">
        {loading && <p className="text-green-700 text-sm text-center">Chargement ...</p>}
        {statistics.map((stat) => (
          <Statistic statistic={stat} key={stat.id} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
