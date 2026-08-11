import { Edit2Icon, Trash2Icon, User } from "lucide-react";
import type { Partner } from "../../../utils/type";
 

type partnerListProps = {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
  // onRefresh:()=>void;
};

const ListPartner = ({ partners, onEdit, onDelete }: partnerListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Logo
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Partenaire
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {partners.map((partner: Partner, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={'photo-partner'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <User size={30} />
                )}
              </td>
              <td className="px-6 py-4 text-gray-500 font-medium">
                Partenaire
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <button
                  onClick={() => onEdit(partner)}
                  className="text-blue-500 hover:text-blue-300"
                >
                  <Edit2Icon
                    size={18}
                    className="text-blue-500 hover:text-blue-300"
                  />
                </button>
                <button
                  onClick={() => onDelete(partner)}
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

export default ListPartner;

// {fail && (
//         <ErrorMessage
//           message="Le système rencontre un problème lors du chargement des données"
//           refresh={onRefresh}
//         />
//       )}
