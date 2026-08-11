// "use client";
// import { useCreateMail } from "@/features/mail-list/hooks/use-create-mail-list";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "./customer-toast";
import { useCreateMail } from "../features/mail-list/hooks/use-create-mail-list";

type askingReportProps = {
  onClose: () => void;
  open: boolean;
  // setOpen:()=>void;
};

const AskingReport = ({ onClose, open }: askingReportProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    prenom: "",
    noms: "",
    mail: "",
    message: "",
  });
  const { createMail, pending, fail } = useCreateMail();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await createMail(formData);
      showToast("Message envoyé avec succes !", "success");
      onClose();
      setFormData({ prenom: "", noms: "", mail: "", message: "", id: 0 });
    } catch (err) {
      console.log(err);
      showToast("Erreur lors de l'envoi du message", "error");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Demande de lecture du rapport{" "}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-start">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex flex-col gap-0.5 text-start">
              <label htmlFor="" className="text-sm font-medium text-gray-600">
                Prénom
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded py-3 px-1 focus:ring-2 focus:ring-secondary outline-none"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                placeholder="Prénom"
              />
            </div>
            <div className="flex flex-col gap-0.5 text-start">
              <label htmlFor="" className="text-sm font-medium text-gray-600">
                Nom
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded py-3 px-1 focus:ring-2 focus:ring-secondary outline-none"
                value={formData.noms}
                onChange={(e) =>
                  setFormData({ ...formData, noms: e.target.value })
                }
                placeholder="Nom"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-start">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded py-3 px-1 focus:ring-2 focus:ring-secondary outline-none text-gray-500"
              value={formData.mail}
              onChange={(e) =>
                setFormData({ ...formData, mail: e.target.value })
              }
              placeholder="Mail"
            />
          </div>
          <div className="flex flex-col gap-2 my-3 text-start">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              className="border border-gray-300 rounded py-3 px-1 focus:ring-2 focus:ring-secondary outline-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Message ici"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 py-2 px-3 rounded my-6 cursor-pointer"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin py-3 px-6" />
            ) : (
              "Soumettre"
            )}
          </button>
        </form>
        <p>{fail && "Erreur lors de l'envoi du message"}</p>
      </div>
    </div>
  );
};

export default AskingReport;
