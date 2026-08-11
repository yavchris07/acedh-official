import { useState } from "react";
import { reportApi } from "../api";
// import { Report } from "../api";

export const useUpdateReport = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateReport = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await reportApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateReport, load, er };
};
