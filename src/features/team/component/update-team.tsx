import { Loader2, SquarePen, X } from "lucide-react";
import React, { useState } from "react";

import { useUpdateTeam } from "../hooks/use-update-team";
import type { Team } from "../../../utils/type";

type updateTeamProps = {
  open: boolean;
  onClose: () => void;
  team: Team;
};

const UpdateTeam = ({ team, open, onClose }: updateTeamProps) => {
  const [formData, setFormData] = useState({
    id: team.id,
    noms: team.noms,
    fonction: team.fonction,
    image: team.image,
  });

  const [file, setFile] = useState<File | null>(null);
  const { updateTeam, load: loading, er } = useUpdateTeam();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDt = new FormData();
      // formData.append("id", data.id);
      formDt.append("noms", formData.noms);
      formDt.append("fonction", formData.fonction);

      if (file) {
        formDt.append("image", file);
      }
      await updateTeam(team.id, formDt);
      alert("Membre modifié avec succès !");
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
            Modifier le membre {team.noms}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
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
              value={formData.noms}
              onChange={(e) =>
                setFormData({ ...formData, noms: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Fonction
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.fonction}
              onChange={(e) =>
                setFormData({ ...formData, fonction: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
              disabled={loading}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <SquarePen size={20} /> Modifier
                </>
              )}
            </button>
          </div>
          {er && (
            <div className="text-red-500 text-sm text-center">
              Erreur lors de la modification.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateTeam;
