import { useState } from "react";
import { adressApi } from "../api";

export const useDeleteAdress = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteAdress = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await adressApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete adress error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAdress, pending, error };
};
