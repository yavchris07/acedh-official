import { useState } from "react";
import { partnerApi } from "../api";

export const useUpdatePartner = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updatePartner = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await partnerApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updatePartner, load, er };
};
