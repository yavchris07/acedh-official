import { useEffect, useState } from "react";
import { mailListApi } from "../api";
import type { Mail } from "../../../utils/type";

export const useMailLists = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMails = async () => {
    try {
      setLoading(true);
      const data = await mailListApi.getAll();
      setMails(data);
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

  return { mails, loading, error, refresh: fetchMails };
};
