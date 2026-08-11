import type { Stat } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const statisticsApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/statistique/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: Stat) => {
    const res = await fetch(`${API_URL}/statistique/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création contact");
    return res.json();
  },

  update: async (id: number, data: Stat) => {
    const res = await fetch(`${API_URL}/statistique/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update contact");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/statistique/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};
