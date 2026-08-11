import { useState } from "react";
import { authApi } from "../api";
import type { User } from "../../../utils/type";

export const useAuth = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const authUser = async (data: User) => {
    try {
      setLoading(true);
      setError("");
      return await authApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { authUser, pending, fail };
};
