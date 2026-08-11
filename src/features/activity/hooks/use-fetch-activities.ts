import { useCallback, useEffect, useState } from "react";
import { activitiesApi } from "../api";
import type { Activity } from "../../../utils/type";

export const useFetchActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await activitiesApi.getAll();
      setActivities(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchActivities();
  }, []);

  return { activities, loading, error, refresh: fetchActivities };
};
