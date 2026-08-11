import { useState } from "react";
import { Loader2, SquarePen, X } from "lucide-react";
import type { Activity } from "../../../utils/type";
import { updateActivity } from "../hooks/update-activity";

type updateActivityProps = {
  open: boolean;
  onClose: () => void;
  activity: Activity;
  onRefresh: () => Promise<void>;
};

const UpdateActivity = ({
  open,
  onClose,
  activity,
  onRefresh,
}: updateActivityProps) => {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    titre: activity.titre,
    resume: activity.resume,
    photo: activity.photo,
    date_upload: activity.date_upload
  });

  const handleSubmit = async () => {
    setLoading(true);

    const formDt = new FormData();
    // formData.append("id", data.id);
    formDt.append("titre", formData.titre);
    formDt.append("resume", formData.resume);
     formDt.append("resume", formData.date_upload);

    if (file) {
      formDt.append("image", file);
    }
    await updateActivity(formDt);
    alert("Activité modifiée avec succès !");
    onClose();
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
            Modifier
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
              value={formData.titre}
              onChange={(e) =>
                setFormData({ ...formData, titre: e.target.value })
              }
              placeholder="Titre"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Resume</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.resume}
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.value })
              }
              placeholder="Resume"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Photo</label>
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
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
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
        </form>
      </div>
    </div>
  );
};

export default UpdateActivity;
