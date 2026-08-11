import { useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import type { Gallery } from "../../../utils/type";

type updateGalleryProps = {
  open: boolean;
  onClose: () => void;
  gallery: Gallery;
  onRefresh: () => Promise<void>;
};
const UpdateGallery = ({
  open,
  onClose,
  gallery,
  onRefresh,
}: updateGalleryProps) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    detail_activite: gallery.detail_activite,
    photo: null as File | null,
  });

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await onRefresh();
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier la photo : {gallery.detail_activite.substring(0, 20)}{" "}
            {gallery.detail_activite.length > 20 ? "..." : ""}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
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
              disabled={loading}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGallery;
