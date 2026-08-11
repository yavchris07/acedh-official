import React, { useState } from "react";
import CreateProject from "../../features/project/component/create-project";
import DeleteProject from "../../features/project/component/delete-project";
import EditProject from "../../features/project/component/edit-project";
import ProjectList from "../../features/project/component/project-list";
import { useProjects } from "../../features/project/hooks/use-projects";
import type { Project } from "../../utils/type";
import Container from "../../components/container";

const ProjectPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  const { projects, loading, error, refresh } = useProjects();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const handleEdit = (projet: Project) => {
    setSelectedItem(projet);
    setOpen(true);
    refresh();
  };

  const handleDelete = (projet: Project) => {
    setSelectedItem(projet);
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
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal"> Projet</span>
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
          Chargement des projets...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {projects.length > 0 ? (
        <ProjectList
          projects={currentProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center text-gray-500 text-sm">
          Aucun projet trouvé.
        </div>
      )}
      {projects.length > 11 && (
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
        <CreateProject
          open={isModal}
          onClose={() => onCloseModal()}
          onRefresh={refresh}
        />
      )}
      {open && selectedItem && (
        <EditProject
          project={selectedItem}
          open={open}
          onClose={() => setOpen(false)}
          onRefresh={refresh}
        />
      )}

      {modal && selectedItem && (
        <DeleteProject
          open={modal}
          onClose={() => setModal(false)}
          project={selectedItem}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default ProjectPage;
