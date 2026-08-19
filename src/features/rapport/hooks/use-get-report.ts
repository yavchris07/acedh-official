import { useEffect, useState } from "react";
import { reportApi } from "../api";
import type { Report } from "../../../utils/type";

export const useGetReport = (id: number) => {
  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const data = await reportApi.get(id);
      setReport(data.data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchActivity();
  }, []);

  return { report, loading, error, refresh: fetchActivity };
};
