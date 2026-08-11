import { useState } from "react";
import { partnerApi } from "../api";

export const useCreatePartner = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createPartner = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await partnerApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPartner, pending, fail };
};
