import { useState } from "react";
import { projectApi } from "../api";
import type { Project } from "../../../utils/type";

export const useCreateProject = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createProject = async (data: Project) => {
    try {
      setLoading(true);
      setError("");
      return await projectApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProject, pending, fail };
};
