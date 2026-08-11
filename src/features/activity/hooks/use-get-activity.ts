import { useEffect, useState } from "react";
import { activitiesApi } from "../api";
import type { Activity } from "../../../utils/type";

export const useGetActivity = (id: number) => {
  const [activity, setActivities] = useState<Activity>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const data = await activitiesApi.get(id);
      setActivities(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchActivity();
  }, []);

  return { activity, loading, error, refresh: fetchActivity };
};
