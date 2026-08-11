import { useCallback, useEffect, useState } from "react";
import { projectApi } from "../api";
import type { Project } from "../../../utils/type";
// import { Partner, partnerApi } from "../api";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      const data = await projectApi.getAll();
      setProjects(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProject();
  }, []);

  return { projects, loading, error, refresh: fetchProject };
};
