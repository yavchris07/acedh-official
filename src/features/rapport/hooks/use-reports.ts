import { useCallback, useEffect, useState } from "react";
import { reportApi } from "../api";
import type { Report } from "../../../utils/type";

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reportApi.getAll();
      setReports(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, []);

  return { reports, loading, error, refresh: fetchReports };
};
