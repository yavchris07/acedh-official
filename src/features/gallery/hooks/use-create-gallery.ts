import { useState } from "react";
import { galleryApi } from "../api";

export const useCreateGallery = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createGallery = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      return await galleryApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createGallery, pending, fail };
};
