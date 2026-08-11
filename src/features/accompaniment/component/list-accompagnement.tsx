import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Accompagnement } from "../../../utils/type";

type accompagnementListProps = {
  accompagnements: Accompagnement[];
  loading: boolean;
  fail: string;
  onEdit: (accompagnement: Accompagnement) => void;
  onDelete: (accompagnement: Accompagnement) => void;
};

const ListAccompagnement = ({
  accompagnements,
  loading,
  onDelete,
  onEdit,
}: accompagnementListProps) => {
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
          {loading && (
            <tr className="text-green-500 text-sm text-center">
              <td> Chargement ...</td>
            </tr>
          )}
          {accompagnements.map((acc, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500 font-medium">
                {acc.titre.substring(0, 30)}...
              </td>
              <td className="px-6 py-4 text-gray-500 font-medium">
                {acc.resume.substring(0, 30)}...
              </td>
              <td className="px-6 py-4 text-gray-500 font-medium">
                {/* {acc.photo ? (
                  <FileText color="green" />
                ) : (
                  "Erreur fichier n'est pas present"
                )} */}

                <img src={acc.photo} alt={'img-acc'} width={50} height={50} className="rounded-md" />
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <button
                  onClick={() => onEdit(acc)}
                  className="text-blue-500 hover:text-blue-300"
                >
                  <Edit2Icon
                    size={18}
                    className="text-blue-500 hover:text-blue-300"
                  />
                </button>
                <button
                  onClick={() => onDelete(acc)}
                  className="text-red-400 hover:text-red-300"
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

export default ListAccompagnement;
