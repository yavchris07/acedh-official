import { useState } from "react";
import { statisticsApi } from "../api";

export const useDeleteStatistic = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteStatistic = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await statisticsApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete stat error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteStatistic, pending, error };
};
