import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useCreateMail } from "../../mail-list/hooks/use-create-mail-list";
import { useToast } from "../../../components/customer-toast";

const FormContact = () => {
  const [formData, setFormData] = useState({
    id: 0,
    prenom: "",
    noms: "",
    mail: "",
    message: "",
  });
  const { createMail, pending, fail } = useCreateMail();
  // Contatct

  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      // if(formData.prenom === '' || formData.noms === '' || formData.mail === ''){}
      await createMail(formData);
      showToast("Message envoyé avec succes !", "success");
      setFormData({ prenom: "", noms: "", mail: "", message: "", id: 0 });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("Test");
  return (
    <div className="bg-zinc-50 text-start">
      <h3 className="text-green-900 text-sm font-bold my-4">
        FORMULAIRE DE CONTACT
      </h3>
      <h2 className="text-black font-bold text-4xl">
        Nous envoyer <span className="text-green-700">un message</span>{" "}
      </h2>
      <p className="text-gray-500 text-sm my-4">
        Priere de remplir le formulaire ci-dessous pour nous envoyer un message.
        Nous tiendrons à répondre dans les plus brefs délais
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-1 my-3 sm:grid sm:grid-cols-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Prénom</label>
            <input
              type="text"
              className="border border-gray-300 rounded py-3 px-6"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="" className="text-sm">
              Nom
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded py-3 px-6"
              value={formData.noms}
              onChange={(e) =>
                setFormData({ ...formData, noms: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-sm">
            Email
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded py-3 px-6"
            value={formData.mail}
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label htmlFor="" className="text-sm">
            Message
          </label>
          <textarea
            className="border border-gray-300 rounded py-3 px-6 "
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 py-3 px-3 rounded my-6 cursor-pointer"
        >
          {pending ? (
            <Loader2 className="animate-spin py-3 px-6" />
          ) : (
            "Soumettre"
          )}
        </button>
      </form>
      {fail && <div></div>}
    </div>
  );
};

export default FormContact;
