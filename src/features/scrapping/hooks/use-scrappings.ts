import { useCallback, useEffect, useState } from "react";
import { scrapApi } from "../api";
import type { Scrap } from "../../../utils/type";

export const useScrapping = () => {
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await scrapApi.getAll();
      setScraps(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, [fetchReports]);

  return { scraps, loading, error, refresh: fetchReports };
};
