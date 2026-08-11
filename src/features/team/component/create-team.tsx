import { Loader2, Save, X } from "lucide-react";
import React, { useState } from "react";
import { useCreateTeam } from "../hooks/use-create-team";
import { useToast } from "../../../components/customer-toast";

type createTeamProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const CreateTeam = ({ open, onClose, onRefresh }: createTeamProps) => {
  const [form, setFormData] = useState({
    id: 0,
    noms: "",
    fonction: "",
    image: null as File | null,
  });

  const { showToast } = useToast();

  const { createTeam, pending, fail } = useCreateTeam();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // formData.append("id", data.id);
      formData.append("noms", form.noms);
      formData.append("fonction", form.fonction);

      if (form.image) {
        formData.append("image", form.image);
      }
      await createTeam(formData);
      await onRefresh();
      showToast("Membre créé avec succès", "success");
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
          <h2 className="text-xl font-bold text-gray-800">Ajout Membre</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Nom complet
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.noms}
              onChange={(e) => setFormData({ ...form, noms: e.target.value })}
              placeholder="Nom complet"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Fonction
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.fonction}
              onChange={(e) =>
                setFormData({ ...form, fonction: e.target.value })
              }
              placeholder="Fonction"
            />
          </div>
          <div className="space-y-1">
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...form, image: e.target.files?.[0] || null })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 cursor-pointer"
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
          {fail && (
            <div className="text-red-500 text-sm">
              Erreur lors de la création.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
