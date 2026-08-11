import { useState } from "react";
import { teamApi } from "../api";

export const useCreateTeam = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createTeam = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await teamApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTeam, pending, fail };
};
