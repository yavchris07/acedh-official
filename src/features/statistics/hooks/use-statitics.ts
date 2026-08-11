import { useCallback, useEffect, useState } from "react";
import { statisticsApi } from "../api";
import type { Stat } from "../../../utils/type";

export const useStatistics = () => {
  const [statistics, setAdresses] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await statisticsApi.getAll();
      setAdresses(data);
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

  return { statistics, loading, error, refresh: fetchStats };
};
