import { useState } from "react";
import { userApi } from "../api";
import type { User } from "../../../utils/type";

export const useCreateUser = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createUser = async (data: User) => {
    try {
      setLoading(true);
      setError("");
      return await userApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, pending, fail };
};
