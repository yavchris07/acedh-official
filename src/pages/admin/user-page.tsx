import React, { useEffect } from "react";
import CreateUser from "../../features/user/component/create-user";
import DeleteUser from "../../features/user/component/delete-user";
import UserTable from "../../features/user/component/user-table";
import { useUsers } from "../../features/user/hooks/use-users";
import type { User } from "../../utils/type";
import Container from "../../components/container";

const UserPage = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUserItem, setSelectedUserItem] = React.useState<User | null>(
    null,
  );
  const {
    users: usersData,
    loading: isLoading,
    error: isError,
    refresh,
  } = useUsers();

  const handleDelete = (user: User) => {
    setSelectedUserItem(user);
    setIsOpen(true);
  };

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-500">
            Tableau de bord / <span className="font-normal">Utilisateurs</span>
          </h1>
          <span
            onClick={() => setIsModal(true)}
            className="bg-green-700 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
          >
            +
          </span>
        </div>
        <UserTable
          users={usersData}
          loading={isLoading}
          error={isError}
          onDelete={handleDelete}
        />
        <CreateUser
          open={isModal}
          onClose={() => setIsModal(false)}
          onRefresh={refresh}
        />
        {isOpen && selectedUserItem !== null && (
          <DeleteUser
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onRefresh={refresh}
            user={selectedUserItem}
          />
        )}
      </div>
    </Container>
  );
};

export default UserPage;
