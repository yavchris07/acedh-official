import React, { useState } from "react";
import { useReports } from "../../features/rapport/hooks/use-reports";
import { useProjects } from "../../features/project/hooks/use-projects";
import ReportList from "../../features/rapport/component/report-list";
import CreateReport from "../../features/rapport/component/create-report";
import DeleteReport from "../../features/rapport/component/delete-report";
import UpdateReport from "../../features/rapport/component/update-report";
import type { Report } from "../../utils/type";
import Container from "../../components/container";

const AdminReportPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState<Report | null>(null);

  const { reports, loading, error, refresh } = useReports();
  const { projects } = useProjects();
  console.log("Report : ", reports);

  const handleEdit = (report: Report) => {
    setSelectedItem(report);
    setUpdate(true);
  };

  const handleDelete = (report: Report) => {
    setSelectedItem(report);
    setOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal">Rapports</span>
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
          Chargement des rapports...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {reports.length > 0 ? (
        <ReportList
          reports={currentReports}
          projets={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={refresh}
        />
      ) : (
        ""
      )}

      {reports.length > 11 && (
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
        <CreateReport
          open={isModal}
          onClose={() => setIsModal(false)}
          onRefresh={refresh}
        />
      )}
      {update && selectedItem && (
        <UpdateReport
          report={selectedItem}
          open={update}
          onClose={() => setUpdate(false)}
          onRefresh={refresh}
        />
      )}

      {open && selectedItem && (
        <DeleteReport
          onClose={() => setOpen(false)}
          open={open}
          report={selectedItem}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default AdminReportPage;
