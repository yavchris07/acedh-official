import React, { useState } from "react";
import CreateResource from "../../features/resource/component/create-resource";
import DeleteResource from "../../features/resource/component/delete-resource";
import ResourceList from "../../features/resource/component/resource-list";
import UpdateResource from "../../features/resource/component/update-resource";
import { useResources } from "../../features/resource/hooks/use-resource";
import type { Resource } from "../../utils/type";
import Container from "../../components/container";

const AdminResourcePage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  // const [selectedTeam, setSelectedTeam] = useState<Resource | null>(null);
  const [selecteditem, setSelectedItem] = useState<Resource | null>(null);

  // const { createResource, fail, pending } = useCreateResource();
  const { resources, error, loading, refresh } = useResources();

  const handleDelete = (item: Resource) => {
    setSelectedItem(item);
    setOpenDelete(true);

  };

  const handleEdit = (item: Resource) => {
    setSelectedItem(item);
    setOpen(true);
  };

  //   const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 11;
  // // Pagination logic
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentPartners = mails.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(mails.length / itemsPerPage);

  return (
    <Container>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          {" "}
          Tableau de bord / <span className="font-normal">Ressource</span>
        </h1>
        <span
          onClick={() => setIsModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
        >
          +
        </span>
      </div>

      {
        <ResourceList
          resources={resources}
          onDelete={handleDelete}
          onEdit={handleEdit}
          fail={error}
          loading={loading}
        />
      }

      {isModal && (
        <CreateResource
          onClose={() => setIsModal(false)}
          onRefresh={refresh}
          open={isModal}
        />
      )}

      {open && selecteditem && (
        <UpdateResource
          onClose={() => setOpen(false)}
          onRefresh={refresh}
          open={open}
          resource={selecteditem}
        />
      )}

      {openDelete && selecteditem && (
        <DeleteResource
          onRefresh={refresh}
          onClose={() => setOpenDelete(false)}
          open={openDelete}
          resource={selecteditem}
        />
      )}
    </Container>
  );
};

export default AdminResourcePage;
