import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Adress } from "../../../utils/type";

type adressListProps = {
  adresses: Adress[];
  onEdit: (contact: Adress) => void;
  onDelete: (contact: Adress) => void;
};

const AdressList = ({ adresses, onDelete, onEdit }: adressListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Phone
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {adresses.map((adress: Adress, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">{adress.adresse}</td>
              <td className="px-6 py-4 flex justify-start gap-2">
                <button
                  onClick={() => onEdit(adress)}
                  className="text-blue-500 hover:text-blue-300 cursor-pointer"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(adress)}
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

export default AdressList;
