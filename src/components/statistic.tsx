import type { Stat } from "../utils/type";

type statisticProps = {
  statistic: Stat;
};

const Statistic = ({ statistic }: statisticProps) => {
  return (
    <div className="text-white flex flex-col items-center">
      <span className="text-5xl max-sm:text-2xl">{statistic.estimation}</span>
      <span className="text-2xl max-sm:text-xl">{statistic.titre}</span>
    </div>
  );
};

export default Statistic;
