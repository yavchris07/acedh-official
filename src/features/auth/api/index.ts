import type { User } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  create: async (data: User) => {
    const res = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },
};
