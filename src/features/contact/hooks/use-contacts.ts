import { useEffect, useState } from "react";
import { contactApi } from "../api";
import type { Contact } from "../../../utils/type";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMails = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getAll();
      setContacts(data);
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

  return { contacts, loading, error, refresh: fetchMails };
};
