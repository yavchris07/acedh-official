import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Project } from "../../../utils/type";

type projectListProps = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

const ProjectList = ({ projects, onDelete, onEdit }: projectListProps) => {
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
              Date debut
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Date fin
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.map((project, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">
                {project.titre.substring(0, 30)}
                {project.titre.length < 30 ? "" : "..."}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {project.resume.substring(0, 40)}{" "}
                {project.resume.length < 40 ? "" : "..."}
              </td>
              <td className="px-6 py-4 text-gray-500">{project.date_debit}</td>
              <td className="px-6 py-4 text-gray-500">{project.date_fin}</td>
              <td className="px-6 py-4 flex justify-start gap-2">
                <button
                  onClick={() => onEdit(project)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(project)}
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

export default ProjectList;
