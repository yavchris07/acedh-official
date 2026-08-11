import React, { useState } from "react";
import CreateTeam from "../../features/team/component/create-team";
import DeleteTeam from "../../features/team/component/delete-team";
import TeamList from "../../features/team/component/team-list";
import UpdateTeam from "../../features/team/component/update-team";
import { useTeamMembers } from "../../features/team/hooks/use-fetch-team-members";
import type { Team } from "../../utils/type";
import Container from "../../components/container";

const TeamPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const { teamMembers, loading, error, refresh } = useTeamMembers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  console.log("Team : ", teamMembers);

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleDelete = (team: Team) => {
    setSelectedTeam(team);
    setModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeams = teamMembers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal">Equipe</span>
        </h1>
        <span
          onClick={() => setIsModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>
      {/* Liste */}
      {loading && (
        <div className="p-10 text-center text-green-700">
          Chargement des membres de l&apos;équipe...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {teamMembers.length > 0 ? (
        <TeamList
          teams={currentTeams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center text-sm text-gray-500">
          Aucun membre d&apos;équipe trouvé.
        </div>
      )}
      {teamMembers.length > 11 && (
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
        <CreateTeam
          open={isModal}
          onClose={() => setIsModal(false)}
          onRefresh={refresh}
        />
      )}
      {open && selectedTeam && (
        <UpdateTeam
          team={selectedTeam}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}

      {modal && selectedTeam && (
        <DeleteTeam
          open={modal}
          onClose={() => setModal(false)}
          team={selectedTeam}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default TeamPage;
