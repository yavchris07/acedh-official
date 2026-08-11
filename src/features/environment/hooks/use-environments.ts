import { useCallback, useEffect, useState } from "react";
import { environmentApi } from "../api";
import type { Environment } from "../../../utils/type";

export const useEnvironment = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await environmentApi.getAll();
      setEnvironments(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  return { environments, loading, error, refresh: fetchStats };
};
