import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Activity } from "../../../utils/type";

type ActivityListProps = {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
};

const ActivityList = ({ activities, onEdit, onDelete }: ActivityListProps) => {
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
          {activities.map((activity: Activity) => (
            <tr key={activity.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">
                {activity.titre.substring(0, 50)}
                {activity.titre.length < 50 ? "" : "..."}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {" "}
                {activity.resume.substring(0, 70)}{" "}
                {activity.resume.length > 70 ? "..." : ""}
              </td>
              <td className="px-6 py-4">
                <img
                  src={activity.photo}
                  alt={activity.titre}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <button
                  onClick={() => onEdit(activity)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(activity)}
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

export default ActivityList;
