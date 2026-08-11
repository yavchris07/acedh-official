import { useState } from "react";
import Container from "../../components/container";
import CreateEnvironment from "../../features/environment/component/create-environment";
import DeleteEnvironment from "../../features/environment/component/delete-environment";
import ListEnvironment from "../../features/environment/component/list-environment";
import UpdateEnvironment from "../../features/environment/component/update-environment";
import { useEnvironment } from "../../features/environment/hooks/use-environments";
import type { Environment } from "../../utils/type";

const EnvironnementPage = () => {
  //Enviro
  const [isModalEnv, setIsModalEnv] = useState(false);
  const [isUpdateEnv, setIsUpdateEnv] = useState(false);
  const [isDeleteEnv, setIsdeleteEnv] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(null);

  const {
    environments,
    error: err,
    loading: loa,
    refresh: rx,
  } = useEnvironment();

  const handleDeleteEnv = (item: Environment) => {
    setSelectedEnv(item);
    setIsdeleteEnv(true);
  };
  const handleUpdateEnv = (item: Environment) => {
    setSelectedEnv(item);
    setIsUpdateEnv(true);
  };

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center my-2">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal"> Environnement</span>{" "}
        </h1>
        <span
          onClick={() => setIsModalEnv(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {loa && (
        <div className="p-10 text-center text-green-700">
          Chargement des Role...
        </div>
      )}
      {err && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}

      {
        <CreateEnvironment
          onClose={() => setIsModalEnv(false)}
          onRefresh={rx}
          open={isModalEnv}
        />
      }

      {
        <ListEnvironment
          environments={environments}
          onEdit={handleUpdateEnv}
          onDelete={handleDeleteEnv}
        />
      }

      {isDeleteEnv && selectedEnv && (
        <DeleteEnvironment
          environment={selectedEnv}
          onClose={() => setIsdeleteEnv(false)}
          onRefresh={rx}
          open={isDeleteEnv}
        />
      )}

      {isUpdateEnv && selectedEnv && (
        <UpdateEnvironment
          environnemnt={selectedEnv}
          onClose={() => setIsUpdateEnv(false)}
          onRefresh={rx}
          open={isUpdateEnv}
        />
      )}
    </Container>
  );
};

export default EnvironnementPage;
