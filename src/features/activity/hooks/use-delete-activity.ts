import { useState } from "react";
import { activitiesApi } from "../api";

export const useDeleteActivity = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteActivity = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await activitiesApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteActivity error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteActivity, pending, er };
};
