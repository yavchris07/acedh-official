import { useEffect, useState } from "react";
import { Copy, CopyCheck, Edit2Icon, FileText, Trash2Icon } from "lucide-react";
import type { Project, Report } from "../../../utils/type";
import { useToast } from "../../../components/customer-toast";

type ReportListProps = {
  reports: Report[];
  projets: Project[];
  onEdit: (report: Report) => void;
  onDelete: (report: Report) => void;
  onRefresh: () => void;
};

const ReportList = ({
  reports,
  projets,
  onEdit,
  onDelete,
  onRefresh,
}: ReportListProps) => {
  const [copiedId, setCopiedId] = useState(0);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
  const { showToast } = useToast();

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      showToast("Lien Copié avec succès", "success");
      setTimeout(() => {
        setCopiedId(0);
      }, 2000);
    });
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Fichier
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Projet
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Commentaire
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Type document.
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {reports.map((report: Report, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">
                {report.fichier_pdf ? <FileText color="green" /> : ""}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {/* {report.projet} */}
                {projets
                  .find((p) => p.id === report.projet)
                  ?.titre.substring(0, 70) || "Inconnu"}
                ...
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {report.commentaire.substring(0, 60)}
                {report.commentaire.length < 40 ? "" : "..."}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {report.type_document}
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <button
                  onClick={() => onEdit(report)}
                  className="text-blue-500 hover:text-blue-300"
                >
                  <Edit2Icon size={18} />
                </button>
                <button
                  onClick={() => onDelete(report)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2Icon size={18} />
                </button>

                <button
                  onClick={() => handleCopy(report.fichier_pdf, report.id)}
                  className="text-blue-600 hover:text-blue-500"
                >
                  {copiedId === report.id ? (
                    <CopyCheck size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;


