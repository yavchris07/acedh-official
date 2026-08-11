import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Environment } from "../../../utils/type";

type environmentListProps = {
  environments: Environment[];
  onEdit: (environ: Environment) => void;
  onDelete: (environ: Environment) => void;
};

const ListEnvironment = ({
  environments,
  onDelete,
  onEdit,
}: environmentListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Titre
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Resume
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Photo
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {environments.map((env: Environment, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">{env.titre}</td>
              <td className="px-6 py-4 text-gray-500">
                {env.resume.substring(0, 100)}...
              </td>
              {/* <td className="px-6 py-4 text-gray-500">
                {env.resume.substring(0, 120)}
              </td> */}

              <td className="px-6 py-4">
                <img
                  src={env.photo}
                  alt={env.titre}
                  width={50}
                  height={70}
                  className="rounded-full"
                />
              </td>

              <td className="px-6 py-4 flex justify-start gap-2">
                <button
                  onClick={() => onEdit(env)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(env)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
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

export default ListEnvironment;
