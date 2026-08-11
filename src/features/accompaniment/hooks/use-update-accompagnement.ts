// features/rapport/hooks/use-update-report.ts
import { useState } from "react";
import { accompagnementApi } from "../api";

export const useUpdateAccompagnement = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateAccompagnement = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await accompagnementApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateAccompagnement, load, er };
};
