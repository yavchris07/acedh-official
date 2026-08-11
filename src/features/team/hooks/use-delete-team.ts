import { useState } from "react";
import { teamApi } from "../api";

export const useDeleteTeam = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteTeam = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await teamApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteTeam error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTeam, pending, er };
};
