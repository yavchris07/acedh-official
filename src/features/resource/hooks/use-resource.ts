import { useCallback, useEffect, useState } from "react";
import { resourceApi } from "../api";
import type { Resource } from "../../../utils/type";

export const useResources = () => {
  const [resources, setMails] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRessources = useCallback(async () => {
    try {
      setLoading(true);
      const data = await resourceApi.getAll();
      setMails(data);
    } catch (err) {
      if (err instanceof Error)
        setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRessources();
  }, []);

  return { resources, loading, error, refresh: fetchRessources };
};
