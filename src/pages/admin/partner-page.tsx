import React, { useState } from "react";
import CreatePartner from "../../features/partner/component/create-partner";
import DeletePartner from "../../features/partner/component/delete-partner";
import ListPartner from "../../features/partner/component/list-partner";
import UpdatePartner from "../../features/partner/component/update-partner";
import { usePartners } from "../../features/partner/hooks/use-fetch-partners";
import type { Partner } from "../../utils/type";
import Container from "../../components/container";

const PartnerPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const { partners, loading, error, refresh } = usePartners();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner);
    setOpen(true);
    refresh();
  };

  const handleDelete = (partner: Partner) => {
    setSelectedPartner(partner);
    setModal(true);
    refresh();
  };

  const onCloseModal = () => {
    setIsModal(false);
    refresh();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = partners.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(partners.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal"> Partenaires</span>
        </h1>
        <span
          onClick={() => setIsModal(true)}
          className="bg-green-700 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>
      {/* Liste */}
      {loading && (
        <div className="p-10 text-center text-green-700">
          Chargement des partenaires...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {partners.length > 0 ? (
        <ListPartner
          partners={currentPartners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center text-gray-500 text-sm">
          Aucun partenaire trouvé.
        </div>
      )}
      {partners.length > 9 && (
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

      {/* Modal */}
      {isModal && (
        <CreatePartner
          open={isModal}
          onClose={() => onCloseModal()}
          onRefresh={refresh}
        />
      )}
      {open && selectedPartner && (
        <UpdatePartner
          partner={selectedPartner}
          open={open}
          onClose={() => setOpen(false)}
          onRefresh={refresh}
        />
      )}

      {modal && selectedPartner && (
        <DeletePartner
          open={modal}
          onClose={() => setModal(false)}
          partner={selectedPartner}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default PartnerPage;
