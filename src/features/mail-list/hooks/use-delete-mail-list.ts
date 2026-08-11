import { useState } from "react";
import { mailListApi } from "../api";

export const useDeleteMail = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteMail = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await mailListApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteMail error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMail, pending, error };
};
