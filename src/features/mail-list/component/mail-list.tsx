import { Edit2Icon, Trash2Icon } from "lucide-react";
import type { Mail } from "../../../utils/type";

type mailListProps = {
  mails: Mail[];
  onEdit: (mail: Mail) => void;
  onDelete: (mail: Mail) => void;
};

const MailList = ({ mails, onEdit, onDelete }: mailListProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Noms
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Adresse mail
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Message
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {mails.map((mail: Mail, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">
                {mail.noms} {mail.prenom}
              </td>
              <td className="px-6 py-4 text-gray-500">{mail.mail}</td>
              <td className="text-gray-500 px-6 py-4">{mail.message?.substring(0,27)}</td>
              <td className="px-6 py-4 flex justify-start gap-2">
                <button
                  onClick={() => onEdit(mail)}
                  className="text-blue-500 hover:text-blue-300"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(mail)}
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

export default MailList;
