import { X, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useUpdateReport } from "../hooks/use-update-report";
import { useProjects } from "../../project/hooks/use-projects";
import { useToast } from "../../../components/customer-toast";
import type { Report } from "../../../utils/type";
 

type updateReportProps = {
  open: boolean;
  onClose: () => void;
  report: Report;
  onRefresh: () => Promise<void>;
};

const UpdateReport = ({
  report,
  open,
  onClose,
  onRefresh,
}: updateReportProps) => {
  const [form, setForm] = useState({
    fichier_pdf: report.fichier_pdf as File | string | null,
    commentaire: report.commentaire,
    projet: report.projet,
    id: report.id,
  });

  const { updateReport, er, load } = useUpdateReport();
  const { projects } = useProjects();

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", form.id.toString());
      formData.append("commentaire", form.commentaire);
      formData.append("projet", form.projet.toString());
      if (form.fichier_pdf instanceof File) {
        formData.append("fichier_pdf", form.fichier_pdf);
      }
      await updateReport(form.id, formData);
      await onRefresh();
      showToast("Nouveau rapport ajouté", "success");
      onClose();
      setForm({
        fichier_pdf: null as File | null,
        commentaire: "",
        projet: 0,
        id: 0,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
        showToast("Erreur sur rapport", "error");
      } else {
        console.log("Une erreur est survenue !");
        showToast("Erreur sur rapport", "error");
      }
    } finally {
      console.log("oky");
    }
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, projet: Number(event.target.value) });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier le rapport
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Projet</label>
            <select
              name="projet"
              id="projet"
              value={form.projet}
              onChange={handleProjectChange}
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            >
              <option value="">Sélectionner un projet</option>
              {projects.map((project, i) => (
                <option key={i} value={project.id}>
                  {project.titre}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Commentaire
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.commentaire}
              onChange={(e) =>
                setForm({ ...form, commentaire: e.target.value })
              }
              type="text"
              placeholder="Commentaire"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Fichier</label>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 cursor-pointer"
              // value={form.fichier_pdf}
              onChange={(e) =>
                setForm({ ...form, fichier_pdf: e.target.files?.[0] || null })
              }
              placeholder="Fichier"
              type="file"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition text-gray-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={load}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              {load ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Modifier
                </>
              )}
            </button>
          </div>
          {er && <p>Echec de la modification</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateReport;
