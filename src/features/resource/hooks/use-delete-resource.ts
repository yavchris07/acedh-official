import { useState } from "react";
import { resourceApi } from "../api";

export const useDeleteResource = () => {
  const [pending, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteResource = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await resourceApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete resource error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, pending, error };
};
