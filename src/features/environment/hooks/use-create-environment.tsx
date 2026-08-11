import { useState } from "react";
import { environmentApi } from "../api";

export const useCreateEnvironment = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createEnvironemnt = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await environmentApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createEnvironemnt, pending, fail };
};
