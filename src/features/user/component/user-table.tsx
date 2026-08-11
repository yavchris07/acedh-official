import { Trash2Icon } from "lucide-react";
import type { User } from "../../../utils/type";


type UserTableProps = {
  users: User[];
  loading: boolean;
  error: string;
  onDelete: (user: User) => void;
};

const UserTable = ({
  users: usersData,
  loading,
  error,
  onDelete,
}: UserTableProps) => {
  if (loading)
    return (
      <div className="p-10 text-center text-green-700">
        Chargement des utilisateurs...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-red-500 text-center text-sm">
        Erreur lors de la récupération.
      </div>
    );

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Utilisateur
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {usersData.slice(0,8).map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-500">{user.email}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
              </td>
              <td className="px-6 py-4">
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => onDelete(user)}
                >
                  <Trash2Icon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
