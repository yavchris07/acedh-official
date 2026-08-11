import React, { useState } from "react";
import { X, Loader2, SquarePen } from "lucide-react";
import { useUpdateContact } from "../hooks/use-update-contact";
import type { Contact } from "../../../utils/type";
import { useToast } from "../../../components/customer-toast";

type updateContactProps = {
  open: boolean;
  onClose: () => void;
  contact: Contact;
  onRefresh: () => Promise<void>;
};

const UpdateContact = ({
  contact,
  open,
  onClose,
  onRefresh,
}: updateContactProps) => {
  const [formData, setFormData] = useState({
    id: contact.id,
    telephone: contact.telephone,
  });

  const { updateContact, load, er } = useUpdateContact();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await updateContact(contact.id, formData);
      await onRefresh();
      showToast("Modification reussi avec succes", "success");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier Le contact
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
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              placeholder="Téléphone"
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
              disabled={load}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
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

export default UpdateContact;
