import { useState } from "react";
import { accompagnementApi } from "../api";

export const useDeleteAccompagnement = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteAccompagnement = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await accompagnementApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete Accompagn error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccompagnement, pending, error };
};
