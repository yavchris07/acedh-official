// features/rapport/hooks/use-update-report.ts
import { useState } from "react";
import { resourceApi } from "../api";

export const useUpdateResource = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateResource = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await resourceApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateResource, load, er };
};
