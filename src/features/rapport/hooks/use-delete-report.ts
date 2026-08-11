import { useState } from "react";
import { reportApi } from "../api";

export const useDeleteReport = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteReport = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await reportApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteChurch error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteReport, pending, er };
};
