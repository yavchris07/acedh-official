import { useState } from "react";
import { resourceApi } from "../api";

export const useCreateResource = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createResource = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await resourceApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createResource, pending, fail };
};
