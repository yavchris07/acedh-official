import { Loader2, Save, X } from "lucide-react";
import React from "react";
import { useCreateUser } from "../hooks/use-create-user";
import { useToast } from "../../../components/customer-toast";

type CreateUserProps = {
  open: boolean;
  onClose: () => void;
  // onRefresh: () => void;
  onRefresh: () => Promise<void>;
};

const CreateUser = ({ open, onClose, onRefresh }: CreateUserProps) => {
  const [formData, setFormData] = React.useState({
    id: 0,
    email: "",
    password: "",
  });

  const { createUser, pending, fail } = useCreateUser();
  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await createUser(formData);
      await onRefresh();
      // alert("Utilisateur créé avec succès !");
      // setFormData({ id: 0, email: "", password: "" });
      showToast("Utilisateur créé avec succès !", "success");
      onClose();
      setFormData({ id: 0, email: "", password: "" });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
      } else {
        console.log("Une erreur est survenue !");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Ajout utilisateur</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Mot de passe"
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
              disabled={pending}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
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
          {fail && (
            <div className="text-red-500 text-sm">
              Erreur lors de la création.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
