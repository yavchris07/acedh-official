import { X, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useCreatePartner } from "../hooks/use-create-partner";
import { useToast } from "../../../components/customer-toast";

type createPartnerProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const CreatePartner = ({ open, onClose, onRefresh }: createPartnerProps) => {
  const [form, setForm] = useState({
    logo: null as File | null,
  });

  const { showToast } = useToast();
  const { createPartner, pending, fail } = useCreatePartner();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (form.logo) {
        formData.append("logo", form.logo);
      }
      await createPartner(formData);
      await onRefresh();
      showToast("Partenaire créé avec succès", "success");
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
            Ajouter un Partenaire
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, logo: e.target.files?.[0] || null })
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

export default CreatePartner;
