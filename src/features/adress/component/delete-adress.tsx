import React from "react";
import { useDeleteAdress } from "../hooks/use-delete-adress";
import { X, Loader2, Trash2Icon } from "lucide-react";
import { useToast } from "../../../components/customer-toast";
import type { Adress } from "../../../utils/type";

type deleteAdressProps = {
  open: boolean;
  onClose: () => void;
  adress: Adress;
  onRefresh: () => void;
};

const DeleteAdress = ({
  adress,
  onClose,
  open,
  onRefresh,
}: deleteAdressProps) => {
  const { showToast } = useToast();
  const { deleteAdress, pending, error } = useDeleteAdress();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAdress(adress.id);
      showToast("Contact supprimé avec succès !", "success");
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
            Supprimer l&apos;adresse
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="text-gray-500">
            Êtes-vous sûr de vouloir supprimer cette adresse{" "}
            <span className="font-semibold">
              {adress.adresse.substring(0, 22)}{" "}
              {adress.adresse.length <= 22 ? "" : "..."}
            </span>{" "}
            ?
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl hover:bg-gray-100 transition text-gray-500 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {pending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Trash2Icon size={20} /> Supprimer
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">
              Erreur lors de la suppression.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeleteAdress;
