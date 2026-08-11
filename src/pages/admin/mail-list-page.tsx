import { useState } from "react";
import DeleteMail from "../../features/mail-list/component/delete-mail";
import MailList from "../../features/mail-list/component/mail-list";
import { useMailLists } from "../../features/mail-list/hooks/use-mal-lists";
import type { Mail } from "../../utils/type";
import Container from "../../components/container";

const MailListPage = () => {
  const [modal, setModal] = useState(false);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const { mails, loading, error } = useMailLists();

  const handleEdit = (mail: Mail) => {
    setSelectedMail(mail);
    // setModal(true)
  };
  const handleDelete = (mail: Mail) => {
    setSelectedMail(mail);
    setModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = mails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mails.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord /{" "}
          <span className="font-normal">Liste de mails</span>{" "}
        </h1>
        <span className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2">
          +
        </span>
      </div>

      {/* Liste */}
      {loading && (
        <div className="p-10 text-center text-green-700">
          Chargement des adresses mails...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {mails.length > 0 ? (
        <MailList
          mails={currentPartners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center text-gray-400 text-sm">
          Aucune adresse mail trouvée.
        </div>
      )}

      {mails.length > 11 && (
        <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Précédent
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      )}

      {modal && selectedMail && (
        <DeleteMail
          mail={selectedMail}
          onClose={() => setModal(false)}
          open={modal}
        />
      )}
    </Container>
  );
};

export default MailListPage;
