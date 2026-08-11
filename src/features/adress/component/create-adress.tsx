import React, { useState } from "react";
import { useCreateAdress } from "../hooks/use-create-adress";
import { X, Loader2, Save } from "lucide-react";
import { useToast } from "../../../components/customer-toast";

type createAdressProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

const CreateAdress = ({ onClose, open, onRefresh }: createAdressProps) => {
  const [formData, setFormData] = useState({ id: 0, adresse: "" });
  const { showToast } = useToast();
  const { createAdress, pending, fail } = useCreateAdress();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createAdress(formData);
      showToast("Adresse créée avec succès", "success");
      onClose();
      onRefresh();
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
            Adresse de l&apos;association
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Téléphone
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.adresse}
              onChange={(e) =>
                setFormData({ ...formData, adresse: e.target.value })
              }
              placeholder="Adresse"
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
            Erreur lors de la creation.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdress;
