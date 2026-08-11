import { useState } from "react";
import { galleryApi } from "../api";

export const useUpdateGallery = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateGallery = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const result = await galleryApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateGallery, load, er };
};
