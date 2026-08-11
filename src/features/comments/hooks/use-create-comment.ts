import { useState } from "react";
import { commetsApi } from "../api";
import type { Comment } from "../../../utils/type";

export const useCreateComment = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createComment = async (data: Comment) => {
    try {
      setLoading(true);
      setError("");
      return await commetsApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createComment, pending, fail };
};
