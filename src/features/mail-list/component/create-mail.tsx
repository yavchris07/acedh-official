import { X, Loader2, Save } from "lucide-react";
import { useState } from "react";

type createMailProps = {
  open: boolean;
  onClose: () => void;
};

const CreateMail = ({ open, onClose }: createMailProps) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
  };

  const [formData, setFormData] = useState({
    prenom: "",
    noms: "",
    mail: "",
  });

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Ajouter un Mail</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Prenom</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
              placeholder="Prenom"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Nms</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.noms}
              onChange={(e) =>
                setFormData({ ...formData, noms: e.target.value })
              }
              placeholder="Noms"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Adresse mail
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.mail}
              onChange={(e) =>
                setFormData({ ...formData, mail: e.target.value })
              }
              placeholder="Adresse mail"
              type="email"
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
                  <Save size={20} /> Sauvegarder
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMail;
