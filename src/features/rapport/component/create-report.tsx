import { X, Loader2, Save } from "lucide-react";
import React, { useState } from "react";
import { useCreateReport } from "../hooks/use-create-report";
import { useProjects } from "../../project/hooks/use-projects";
import { useToast } from "../../../components/customer-toast";

type createReportProps = {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const CreateReport = ({ open, onClose, onRefresh }: createReportProps) => {
  const [form, setForm] = useState({
    fichier_pdf: null as File | null,
    commentaire: "",
    type_document: "",
    projet: 0,
  });

  const types = [
    { id: "rapport", name: "Rapport" },
    { id: "ordinaire", name: "Ordinaire" },
  ];

  const { createReport, fail, pending } = useCreateReport();
  const { projects } = useProjects();

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("TEST : ", form);
    try {
      // setLoading(true);

      // "id": 10,
    // "commentaire": "test",
    // "fichier_pdf": "https://altspace.acedh-rdc.org/media/rapports/Divin_amour_lyrics_n51krUJ.pdf",
    // "type_document": "ordinaire",
    // "date_upload": "2026-06-24T09:30:53.336054Z",
    // "projet": 5
      const formData = new FormData();
      formData.append("commentaire", form.commentaire);
      formData.append("type_document", form.type_document);
      formData.append("projet", form.projet.toString());
      if (form.fichier_pdf) {
        formData.append("fichier_pdf", form.fichier_pdf);
      }
      await createReport(formData);
      await onRefresh();
      showToast("Nouveau rapport ajouté", "success");
      onClose();
      // onRefresh();
      console.log('MMMM : ',formData)
      setForm({
        fichier_pdf: null,
        commentaire: "",
        type_document: "",
        projet: 0,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
        showToast("Erreur sur rapport", "error");
      } else {
        console.log("Une erreur est survenue !");
        showToast("Erreur sur rapport", "error");
      }
    }
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, projet: Number(event.target.value) });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, type_document: event.target.value });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Ajouter un rapport
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Projet</label>
            <select
              name="projet"
              id="projet"
              value={form.projet}
              onChange={handleProjectChange}
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            >
              <option value="">Sélectionner un projet</option>
              {projects.map((project, i) => (
                <option key={i} value={project.id}>
                  {project.titre}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Type document
            </label>
            <select
              name="type-doc"
              value={form.type_document}
              onChange={handleTypeChange}
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            >
              <option value="">Sélectionner un type</option>
              {types.map((typ, i) => (
                <option key={i} value={typ.id}>
                  {typ.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Commentaire
            </label>
            <input
              className="w-full p-3 border text-gray-500 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              value={form.commentaire}
              onChange={(e) =>
                setForm({ ...form, commentaire: e.target.value })
              }
              type="text"
              placeholder="Commentaire"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Fichier</label>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 cursor-pointer"
              // value={form.fichier_pdf}
              onChange={(e) =>
                setForm({ ...form, fichier_pdf: e.target.files?.[0] || null })
              }
              placeholder="Fichier"
              type="file"
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
          {fail && (
            <p className="text-sm text-red-500 text-center">
              Echer lors de la creation de rapport
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
