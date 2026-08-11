import React, { useState } from "react";
import CreateGallery from "../../features/gallery/component/create-gallery";
import DeleteGallery from "../../features/gallery/component/delete-gallery";
import GalleryList from "../../features/gallery/component/gallery-list";
import UpdateGallery from "../../features/gallery/component/update-gallery";
import { useGallery } from "../../features/gallery/hooks/use-fetch-gallery";
import type { Gallery } from "../../utils/type";
import Container from "../../components/container";

const GalleryPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { galleries, loading, error, refresh } = useGallery();

  const handleEdit = (galleri: Gallery) => {
    setSelectedGallery(galleri);
    setOpen(true);
  };

  const handleDelete = (galleri: Gallery) => {
    setSelectedGallery(galleri);
    setModal(true);
  };

  const onCloseModal = () => {
    setIsModal(false);
    refresh();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGalleries = galleries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(galleries.length / itemsPerPage);
  //  console.log(currentGalleries)

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal"> Galerie</span>{" "}
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
          Chargement des photos...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {galleries.length > 0 ? (
        <GalleryList
          galleries={currentGalleries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center text-gray-400 text-sm">
          Aucune photo trouvée.
        </div>
      )}

      {galleries.length > 10 && (
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
      <CreateGallery
        open={isModal}
        onClose={() => onCloseModal()}
        onRefresh={refresh}
      />

      {open && selectedGallery && (
        <UpdateGallery
          open={open}
          onClose={() => setOpen(false)}
          gallery={selectedGallery}
          onRefresh={refresh}
        />
      )}

      {modal && selectedGallery && (
        <DeleteGallery
          open={modal}
          onClose={() => setModal(false)}
          gallery={selectedGallery}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default GalleryPage;
