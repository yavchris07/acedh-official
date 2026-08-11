import { useCallback, useEffect, useState } from "react";
import { galleryApi } from "../api";
import type { Gallery } from "../../../utils/type";

export const useGallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGalleries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await galleryApi.getAll();
      setGalleries(data);
    } catch (err) {
      if (err instanceof Error)
        setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGalleries();
  }, []);

  return { galleries, loading, error, refresh: fetchGalleries };
};
