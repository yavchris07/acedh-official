import { useState } from "react";
import { projectApi } from "../api";

export const useDeleteProject = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteProject = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await projectApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Delete project error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, pending, er };
};
