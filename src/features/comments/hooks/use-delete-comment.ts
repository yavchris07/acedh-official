import { useState } from "react";
import { commetsApi } from "../api";

export const useDeleteComment = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteComment = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await commetsApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete commentaire error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, pending, er };
};
