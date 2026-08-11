import { useState } from "react";
import { statisticsApi } from "../api";
import type { Stat } from "../../../utils/type";

export const useUpdateStatistic = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateStatistic = async (id: number, data: Stat) => {
    try {
      setLoading(true);
      setError("");
      const result = await statisticsApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatistic, load, er };
};
