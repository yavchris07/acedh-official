import { useState } from "react";
import Container from "../../components/container";
import CreateAccompagnemt from "../../features/accompaniment/component/create-accompagnement";
import DeleteAccompagnement from "../../features/accompaniment/component/delete-accompagnement";
import ListAccompagnement from "../../features/accompaniment/component/list-accompagnement";
import UpdateAccompagnement from "../../features/accompaniment/component/update-accompagnement";
import { useAccompagnment } from "../../features/accompaniment/hooks/use-accompagnement";
import type { Accompagnement } from "../../utils/type";

const AccompagnementPage = () => {
  // accompagnement
  const [isModalAcc, setIsModalAcc] = useState(false);
  const [isUpdateAcc, setIsUpdateAcc] = useState(false);
  const [isDeleteAcc, setIsdeleteAcc] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState<Accompagnement | null>(null);
  const {
    accompagnement,
    error: er,
    loading: l,
    refresh: r,
  } = useAccompagnment();
  const handleDeleteAcc = (item: Accompagnement) => {
    setSelectedAcc(item);
    setIsdeleteAcc(true);
  };
  const handleUpdateAcc = (item: Accompagnement) => {
    setSelectedAcc(item);
    setIsUpdateAcc(true);
  };
  return (
    <Container>
      <div className="mb-6 flex justify-between items-center my-3">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal"> Accompagnement</span>{" "}
        </h1>
        <span
          onClick={() => setIsModalAcc(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {
        <ListAccompagnement
          accompagnements={accompagnement}
          fail={er}
          loading={l}
          onDelete={handleDeleteAcc}
          onEdit={handleUpdateAcc}
        />
      }

      {l && (
        <div className="p-10 text-center text-green-700">
          Chargement des Rol...
        </div>
      )}
      {er && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}

      {
        <CreateAccompagnemt
          onClose={() => setIsModalAcc(false)}
          onRefresh={r}
          open={isModalAcc}
        />
      }

      {isDeleteAcc && selectedAcc && (
        <DeleteAccompagnement
          envionnent={selectedAcc}
          onClose={() => setIsdeleteAcc(false)}
          open={isDeleteAcc}
          onRefresh={r}
        />
      )}

      {isUpdateAcc && selectedAcc && (
        <UpdateAccompagnement
          accompagnement={selectedAcc}
          onClose={() => setIsUpdateAcc(false)}
          onRefresh={r}
          open={isUpdateAcc}
        />
      )}
    </Container>
  );
};

export default AccompagnementPage;
