import { useState } from "react";
import { accompagnementApi } from "../api";

export const useCreateAccompagnemt = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createAccompagnement = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await accompagnementApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAccompagnement, pending, fail };
};
