import React, { useState } from "react";
import ActivityList from "../../features/activity/component/activity-list";
import CreateActivity from "../../features/activity/component/create-activity";
import DeleteActivity from "../../features/activity/component/delete-activity";
import UpdateActivity from "../../features/activity/component/update-activity";
import { useFetchActivities } from "../../features/activity/hooks/use-fetch-activities";
import type { Activity } from "../../utils/type";
import Container from "../../components/container";

const ActivityPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  const { activities, loading, error, refresh } = useFetchActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  console.log("Activities : ", activities);

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const handleDelete = (activity: Activity) => {
    setSelectedActivity(activity);
    setModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Tableau de bord / <span className="font-normal">Activités</span>{" "}
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
          Chargement des activités...
        </div>
      )}
      {error && (
        <div className="p-10 text-red-500 text-center text-sm">
          Erreur lors de la récupération.
        </div>
      )}
      {activities.length > 0 ? (
        <ActivityList
          activities={currentActivities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="p-10 text-center">Aucune activité trouvée.</div>
      )}

      {activities.length > 11 && (
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
        <CreateActivity
          open={isModal}
          onClose={() => setIsModal(false)}
          onRefresh={refresh}
        />
      )}
      {open && selectedActivity && (
        <UpdateActivity
          activity={selectedActivity}
          open={open}
          onClose={() => setOpen(false)}
          onRefresh={refresh}
        />
      )}

      {modal && selectedActivity && (
        <DeleteActivity
          open={modal}
          onClose={() => setModal(false)}
          activity={selectedActivity}
          onRefresh={refresh}
        />
      )}
    </Container>
  );
};

export default ActivityPage;
