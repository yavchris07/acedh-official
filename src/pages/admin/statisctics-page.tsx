import { useState } from "react";
import CreateStatistic from "../../features/statistics/component/create-statistic";
import DeleteStatistic from "../../features/statistics/component/delete-statistic";
import StatisticList from "../../features/statistics/component/statistic-list";
import UpdateStatistic from "../../features/statistics/component/update-statistic";
import { useStatistics } from "../../features/statistics/hooks/use-statitics";
import type { Stat } from "../../utils/type";
import Container from "../../components/container";

const StatisticsPage = () => {
  // stat
  const [isModalStat, setIsModalStat] = useState(false);
  const [isUpdateStat, setIsUpdateStat] = useState(false);
  const [isDeleteStat, setIsdeleteStat] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Stat | null>(null);
  const { statistics, error, loading, refresh } = useStatistics();

  const handleDeleteStat = (item: Stat) => {
    setSelectedItem(item);
    setIsdeleteStat(true);
  };
  const handleUpdateStat = (item: Stat) => {
    setSelectedItem(item);
    setIsUpdateStat(true);
  };


  return (
    <Container>
      <div className="mb-6 flex justify-between items-center my-3">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal"> Statistique</span>{" "}
        </h1>
        <span
          onClick={() => setIsModalStat(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {
        <StatisticList
          stats={statistics}
          onEdit={handleUpdateStat}
          onDelete={handleDeleteStat}
        />
      }
      {loading && (
        <div className="p-10 text-center text-green-700">
          Chargement des stats...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {
        <CreateStatistic
          onClose={() => setIsModalStat(false)}
          open={isModalStat}
          onRefresh={refresh}
        />
      }

      {isDeleteStat && selectedItem && (
        <DeleteStatistic
          onClose={() => setIsdeleteStat(false)}
          open={isDeleteStat}
          stat={selectedItem}
          onRefresh={refresh}
        />
      )}
      {isUpdateStat && selectedItem && (
        <UpdateStatistic
          onClose={() => setIsUpdateStat(false)}
          open={isUpdateStat}
          stat={selectedItem}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default StatisticsPage;
