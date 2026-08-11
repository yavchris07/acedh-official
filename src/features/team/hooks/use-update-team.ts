import { useState } from "react";
import { teamApi } from "../api";

export const useUpdateTeam = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateTeam = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await teamApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTeam, load, er };
};
