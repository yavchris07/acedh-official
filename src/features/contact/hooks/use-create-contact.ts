import { useState } from "react";
import { contactApi } from "../api";
import type { Contact } from "../../../utils/type";

export const useCreateContact = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createContact = async (data: Contact) => {
    try {
      setLoading(true);
      setError("");
      return await contactApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createContact, pending, fail };
};
