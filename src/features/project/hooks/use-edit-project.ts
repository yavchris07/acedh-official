import { useState } from "react";
import { projectApi } from "../api";
import type { Project } from "../../../utils/type";

export const useEditProject = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const editProject = async (id: number, data: Project) => {
    try {
      setLoading(true);
      setError("");
      const result = await projectApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editProject, load, er };
};
