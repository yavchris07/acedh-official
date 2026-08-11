import React, { useState } from "react";
import { useCreateComment } from "../hooks/use-create-comment";
import { useToast } from "../../../components/customer-toast";
import type { Comment } from "../../../utils/type";

type createCommentProps = {
  project: number;
  open: boolean;
  onRefresh: () => void;
};

const CreateComment = ({ onRefresh, open, project }: createCommentProps) => {
  const [formData, setFormData] = useState<Comment>({
    nom: "",
    approuve: true,
    article: project,
    contenu: "",
  });

  const { createComment, fail, pending } = useCreateComment();
  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createComment(formData);
      showToast("Nouveau commentaire", "success");
      //   onClose();
      await onRefresh();
      setFormData({
        nom: "",
        approuve: true,
        article: project,
        contenu: "",
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        console.log(err.message || "Une erreur est survenue !");
        showToast("Erreur sur commentaire", "error");
      } else {
        console.log("Une erreur est survenue !");
        showToast("Erreur sur commentaire", "error");
      }
    } finally {
      console.log("oky");
    }
  };

  if (!open) return null;
  return (
    <div className="my-10">
      <p className="text-xs text-gray-500">Commenter en tant que :</p>
      {/* <div className="flex items-center gap-2">
        <User className="inline-block text-gray-800" />{" "}
        <h4 className="font-semibold text-gray-600 inline-block">{name}</h4>
      </div> */}
      <form action="" onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-600"
          placeholder="Votre nom"
        />
        <input
          type="text"
          value={formData.article}
          onChange={(e) =>
            setFormData({ ...formData, article: Number(e.target.value) })
          }
          className="border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-green-500 outline-none text-red-600 hidden"
          placeholder="ID de l'article"
        />
        <textarea
          value={formData.contenu}
          onChange={(e) =>
            setFormData({ ...formData, contenu: e.target.value })
          }
          className="border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-500"
          placeholder="Ecriver ici votre commenetaire !"
        >
          Ecriver ici votre commenetaire !
        </textarea>
        <div>
          <div>
            {/* <User />{" "} */}
            <p className="text-xs my-2 text-gray-500">
              Votre commentaire nous est très important, surtout une{" "}
              <span className="text-green-700">suggestion</span>{" "}
            </p>
          </div>
          <button
            disabled={pending}
            className="px-3 py-2 bg-green-700 text-white text-sm cursor-pointer rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Commenter
          </button>
        </div>
      </form>
      {fail && (
        <p className="text-sm text-red-500">
          Erreur lors de la création du commentaire
        </p>
      )}
    </div>
  );
};

export default CreateComment;
