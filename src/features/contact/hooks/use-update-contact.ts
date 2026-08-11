import { useState } from "react";
import { contactApi } from "../api";
import type { Contact } from "../../../utils/type";

export const useUpdateContact = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateContact = async (id: number, data: Contact) => {
    try {
      setLoading(true);
      setError("");
      const result = await contactApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateContact, load, er };
};
