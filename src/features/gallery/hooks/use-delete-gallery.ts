import { useState } from "react";
import { galleryApi } from "../api";

export const useDeleteGallery = () => {
  const [pending, setLoading] = useState(false);
  const [er, setError] = useState("");

  const deleteGallery = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await galleryApi.delete(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("DeleteGallery error:", err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteGallery, pending, er };
};
