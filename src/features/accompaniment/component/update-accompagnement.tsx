import React from "react";

import { X, Loader2, SquarePen } from "lucide-react";
import { useState } from "react";
import { useUpdateAccompagnement } from "../hooks/use-update-accompagnement";
import type { Accompagnement } from "../../../utils/type";
// import { useUpdateEnvironment } from "../hooks/use-update-accompagnement";

type updateAccompagnementeProps = {
  open: boolean;
  onClose: () => void;
  accompagnement: Accompagnement;
  onRefresh: () => Promise<void>;
};

const UpdateAccompagnement = ({
  accompagnement,
  onClose,
  onRefresh,
  open,
}: updateAccompagnementeProps) => {
  const [form, setForm] = useState({
    titre: accompagnement.titre,
    resume: accompagnement.resume,
    photo: null as File | null,
  });

  const { updateAccompagnement, er, load } = useUpdateAccompagnement();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titre", form.titre);
      formData.append("resume", form.resume);
      if (form.photo) {
        formData.append("image", form.photo);
      }
      await updateAccompagnement(accompagnement.id, formData);
      await onRefresh();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(accompagnement);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Modifier Role</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Titre</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              type="text"
              placeholder="Titre"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Resume</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.resume}
              onChange={(e) => setForm({ ...form, resume: e.target.value })}
              type="text"
              placeholder="Resume"
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

export default UpdateAccompagnement;
