import type { Adress } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const adressApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/adresse/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: Adress) => {
    const res = await fetch(`${API_URL}/adresse/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création contact");
    return res.json();
  },

  update: async (id: number, data: Adress) => {
    const res = await fetch(`${API_URL}/adresse/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update contact");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/adresse/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};
