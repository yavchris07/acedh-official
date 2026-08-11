import { useState } from "react";
import { partnerApi } from "../api";

export const useDeletePartner = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deletePartner = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await partnerApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete partner error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deletePartner, pending, er };
};
