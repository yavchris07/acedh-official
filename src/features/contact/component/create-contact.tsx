import { X, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useCreateContact } from "../hooks/use-create-contact";
import { useToast } from "../../../components/customer-toast";

type createContactProps = {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
};

const CreateContact = ({ open, onClose, refresh }: createContactProps) => {
  const [formData, setFormData] = useState({ id: 0, telephone: "" });
  const { showToast } = useToast();
  const { createContact, pending, fail } = useCreateContact();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createContact(formData);
      await refresh();
      showToast("Contact créé avec succès", "success");
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
          <h2 className="text-xl font-bold text-gray-800">Téléphone</h2>
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
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              placeholder="Numéro téléphone"
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

export default CreateContact;
