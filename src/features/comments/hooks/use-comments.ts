import { useEffect, useState } from "react";
import { commetsApi } from "../api";
import type { Comment } from "../../../utils/type";

export const useComments = (id: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await commetsApi.getAll(id);
      setComments(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProject();
  }, []);

  return { comments, loading, error, refresh: fetchProject };
};
