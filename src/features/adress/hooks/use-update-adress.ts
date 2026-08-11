import { useState } from "react";
import { adressApi } from "../api";
import type { Adress } from "../../../utils/type";

export const useUpdateAdress = () => {
  const [load, setLoading] = useState(false);
  const [er, setError] = useState("");

  const updateAdress = async (id: number, data: Adress) => {
    try {
      setLoading(true);
      setError("");
      const result = await adressApi.update(id, data);
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateAdress, load, er };
};
