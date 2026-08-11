import { useState } from "react";
import { environmentApi } from "../api";

export const useUpdateEnvironment = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateEnvironment = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await environmentApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateEnvironment, load, er };
};
