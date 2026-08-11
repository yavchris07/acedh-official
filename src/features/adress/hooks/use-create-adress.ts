import { useState } from "react";
import { adressApi } from "../api";
import type { Adress } from "../../../utils/type";

export const useCreateAdress = () => {
  const [pending, setLoading] = useState(false);
  const [fail, setError] = useState("");

  const createAdress = async (data: Adress) => {
    try {
      setLoading(true);
      setError("");
      return await adressApi.create(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAdress, pending, fail };
};
