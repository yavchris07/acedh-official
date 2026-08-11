import { X, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useCreateGallery } from "../hooks/use-create-gallery";
import { useToast } from "../../../components/customer-toast";
import { useProjects } from "../../project/hooks/use-projects";

type createGalleryProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const CreateGallery = ({ open, onClose, onRefresh }: createGalleryProps) => {
  const { showToast } = useToast();
  const { createGallery, pending, fail } = useCreateGallery();
  const [form, setForm] = useState({
    detail_activite: "",
    photo: null as File | null,
    projet: 0,
  });

  const { projects } = useProjects();

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, projet: Number(event.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!file || !name) return alert("Nom et Photo requis");
    // customer Toast : succes submit etc. CRUD
    try {
      const formData = new FormData();
      // formData.append("id", data.id);
      formData.append("detail_activite", form.detail_activite);
      formData.append("projet", form.projet.toString());

      if (form.photo) {
        formData.append("photo", form.photo);
      }
      await createGallery(formData);
      await onRefresh();
      showToast("Photo ajoutée avec succès", "success");
      onClose();
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
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
            Ajouter une photo dans la gallerie
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
            <label className="text-sm font-medium text-gray-600">Titre</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.detail_activite}
              onChange={(e) =>
                setForm({ ...form, detail_activite: e.target.value })
              }
              placeholder="Detail de l'activité"
            />
          </div>

          <div className="space-y-1">
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, photo: e.target.files?.[0] || null })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 cursor-pointer"
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
          {fail && (
            <div className="text-red-500 text-sm text-center">
              Erreur lors de la création.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGallery;
