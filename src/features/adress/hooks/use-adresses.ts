import { useEffect, useState } from "react";
import { adressApi } from "../api";
import type { Adress } from "../../../utils/type";

export const useAdresses = () => {
  const [adresses, setAdresses] = useState<Adress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMails = async () => {
    try {
      setLoading(true);
      const data = await adressApi.getAll();
      setAdresses(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMails();
  }, []);

  return { adresses, loading, error, refresh: fetchMails };
};
