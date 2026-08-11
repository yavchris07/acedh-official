import { useState } from "react";
import { commetsApi } from "../api";
import type { Comment } from "../../../utils/type";

export const useEditComment = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const editComment = async (id: number, data: Comment) => {
    try {
      setLoading(true);
      setError("");
      const result = await commetsApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editComment, load, er };
};
