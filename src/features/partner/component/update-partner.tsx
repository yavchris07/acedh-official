import { X, Loader2, SquarePen } from "lucide-react";
import { useUpdatePartner } from "../hooks/use-update-partner";
import { useState } from "react";
import type { Partner } from "../../../utils/type";

type updatePartnerProps = {
  open: boolean;
  onClose: () => void;
  partner: Partner;
  onRefresh: () => Promise<void>;
};

const UpdatePartner = ({
  open,
  onClose,
  partner,
  onRefresh,
}: updatePartnerProps) => {
  const { updatePartner, load, er } = useUpdatePartner();
  const [form, setForm] = useState({
    logo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (form.logo) {
        formData.append("image", form.logo);
      }
      await updatePartner(partner.id, formData);
      await onRefresh();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(partner);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier Le partenaire
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

export default UpdatePartner;
