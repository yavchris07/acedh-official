import { useState } from "react";
import { statisticsApi } from "../api";
import type { Stat } from "../../../utils/type";

export const useCreateStatistic = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createStatistic = async (data: Stat) => {
    try {
      setLoading(true);
      setError("");
      return await statisticsApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createStatistic, pending, fail };
};
