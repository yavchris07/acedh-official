import { X, Loader2, Trash2Icon } from "lucide-react";
import { useDeleteReport } from "../hooks/use-delete-report";
import { useToast } from "../../../components/customer-toast";
import type { Report } from "../../../utils/type";

type deleteReportProps = {
  open: boolean;
  onClose: () => void;
  report: Report;
  // onRefresh: () => void;
  onRefresh: () => Promise<void>;
};

const DeleteReport = ({
  onClose,
  open,
  report,
  onRefresh,
}: deleteReportProps) => {
  const { showToast } = useToast();
  const { deleteReport, pending, er: error } = useDeleteReport();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteReport(report.id);
      await onRefresh();
      showToast("Rapport supprimé avec succès !", "success");
      onClose();
      // await onRefresh()
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
        showToast(error, "error");
      } else {
        console.log("Une erreur est survenue !");
      }
    } finally {
      console.log("oky");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Supprimer ce rapport
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="text-gray-500">
            Êtes-vous sûr de vouloir supprimer ce rapport ?
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl hover:bg-gray-100 transition text-gray-500 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {pending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Trash2Icon size={20} /> Supprimer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteReport;
