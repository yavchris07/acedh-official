import { useState } from "react";
import { userApi } from "../api";

export const useDeleteUser = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await userApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteUser error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, pending, er };
};
