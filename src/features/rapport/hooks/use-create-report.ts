import { useState } from "react";
import { reportApi } from "../api";

export const useCreateReport = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createReport = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await reportApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createReport, pending, fail };
};
