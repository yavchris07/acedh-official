import { useState } from "react";
import { activitiesApi } from "../api";

export const useCreateActivity = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createActivity = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await activitiesApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createActivity, pending, fail };
};
