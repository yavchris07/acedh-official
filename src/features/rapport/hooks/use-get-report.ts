import { useEffect, useState } from "react";
import { reportApi } from "../api";
import type { MetaData, Report } from "../../../utils/type";

export const useGetReport = (id: number) => {
  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [metaData, setMetaData] = useState<MetaData>();

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const data = await reportApi.get(id);
      setReport(data.data);
      setMetaData(data.meta_data);
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

  return { report, metaData, loading, error, refresh: fetchActivity };
};
