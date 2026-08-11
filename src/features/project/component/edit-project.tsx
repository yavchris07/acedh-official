import React from "react";
import { X, Loader2, SquarePen } from "lucide-react";
import { useState } from "react";
import { useEditProject } from "../hooks/use-edit-project";
import type { Project } from "../../../utils/type";
import { useToast } from "../../../components/customer-toast";

type ewditProjectProps = {
  open: boolean;
  onClose: () => void;
  project: Project;
  onRefresh: () => Promise<void>;
};

const EditProject = ({
  onClose,
  onRefresh,
  open,
  project,
}: ewditProjectProps) => {
  const { editProject, load, er } = useEditProject();
  const [formData, setFormData] = useState({
    id: project.id,
    titre: project.titre,
    resume: project.resume,
    date_debit: project.date_debit,
    date_fin: project.date_fin,
  });

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await editProject(project.id, formData);
      await onRefresh();
      showToast("Projet modifié avec succès", "success");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(partner);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier Le projet
          </h2>
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
            <label className="text-sm font-medium text-gray-600">
              Date debut projet
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.date_debit}
              onChange={(e) =>
                setFormData({ ...formData, date_debit: e.target.value })
              }
              placeholder="Date debut"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Date fin projet
            </label>
            <input
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
                  <SquarePen size={20} /> Modifier
                </>
              )}
            </button>
          </div>
        </form>
        {er && (
          <div className="text-red-500 text-sm text-center">
            Erreur lors de la modification.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProject;
