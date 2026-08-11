import { useState } from "react";
import { mailListApi } from "../api";
import type { Mail } from "../../../utils/type";

export const useCreateMail = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createMail = async (data: Mail) => {
    try {
      setLoading(true);
      setError("");
      return await mailListApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createMail, pending, fail };
};
