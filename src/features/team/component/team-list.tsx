import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Team } from "../../../utils/type";
import React from "react";

type TeamListProps = {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
};

const TeamList = ({ teams, onEdit, onDelete }: TeamListProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  console.log(setFile)
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Noms
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Fonction
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Image
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {teams.map((team: Team) => {
            const imageSrc = file
              ? URL.createObjectURL(file)
              : team.image || "/default-avatar.png";
            return (
              <tr key={team.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-500">{team.noms}</div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-400">
                  {team.fonction}
                </td>
                <td className="px-6 py-4">
                  {team.image ? (
                    <img
                      src={imageSrc as string}
                      alt={team.noms}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(team)}
                    className="text-blue-400 hover:text-blue-300 mr-4"
                  >
                    <Edit2Icon size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(team)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2Icon size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;
