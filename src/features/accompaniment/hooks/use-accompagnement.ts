/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { accompagnementApi } from "../api";
import type { Accompagnement } from "../../../utils/type";


export const useAccompagnment = () => {
  const [accompagnement, setEnvironments] = useState<Accompagnement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await accompagnementApi.getAll();
      setEnvironments(data);
    } catch (err) {
      if (err instanceof Error)
        setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  return { accompagnement, loading, error, refresh: fetchStats };
};
