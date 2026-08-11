import { useState } from "react";
import { contactApi } from "../api";

export const useDeleteContact = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteContact = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await contactApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete contact error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteContact, pending, error };
};
