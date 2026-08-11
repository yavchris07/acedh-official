import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Stat } from "../../../utils/type";

type statListProps = {
  stats: Stat[];
  onEdit: (stat: Stat) => void;
  onDelete: (stat: Stat) => void;
};

const StatisticList = ({ stats, onEdit, onDelete }: statListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Titre
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Estimation
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {stats.map((stat: Stat, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">{stat.titre}</td>
              <td className="px-6 py-4 text-gray-500">{stat.estimation}</td>
              <td className="px-6 py-4 flex justify-start gap-2">
                <button
                  onClick={() => onEdit(stat)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(stat)}
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

export default StatisticList;
