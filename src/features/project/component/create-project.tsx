import React, { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import { useCreateProject } from "../hooks/use-create-project";
import { useToast } from "../../../components/customer-toast";

type createProjectProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const CreateProject = ({ onClose, onRefresh, open }: createProjectProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    titre: "",
    resume: "",
    date_debit: "",
    date_fin: "",
  });

  const { showToast } = useToast();
  const { createProject, pending, fail } = useCreateProject();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProject(formData);
      await onRefresh();
      showToast("Project créé avec succès", "success");
      onClose();
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
        showToast("Erreur lors de la creation du projet", "error");
      } else {
        console.log("Une erreur est survenue !");
        showToast("Erreur lors de la creation du projet", "error");
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
          <h2 className="text-xl font-bold text-gray-800">Ajouter un Projet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Titre</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.titre}
              onChange={(e) =>
                setFormData({ ...formData, titre: e.target.value })
              }
              placeholder="Titre"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Resume</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.resume}
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.value })
              }
              placeholder="Resume"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Date debut projet
            </label>
            <input
              type="date"
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.date_debit}
              onChange={(e) =>
                setFormData({ ...formData, date_debit: e.target.value })
              }
              placeholder="Date debut"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Date fin projet
            </label>
            <input
              type="date"
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.date_fin}
              onChange={(e) =>
                setFormData({ ...formData, date_fin: e.target.value })
              }
              placeholder="Date fin"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition text-gray-500 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {pending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Sauvegarder
                </>
              )}
            </button>
          </div>
        </form>
        {fail && (
          <div className="text-red-500 text-sm text-center">
            Erreur lors de la suppression.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
