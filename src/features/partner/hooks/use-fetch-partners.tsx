import { useCallback, useEffect, useState } from "react";
import { partnerApi } from "../api";
import type { Partner } from "../../../utils/type";

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true);
      const data = await partnerApi.getAll();
      setPartners(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, []);

  return { partners, loading, error, refresh: fetchPartners };
};
