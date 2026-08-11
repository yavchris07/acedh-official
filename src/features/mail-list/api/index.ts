import type { Mail } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const mailListApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/mail_liste/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: Mail) => {
    const res = await fetch(`${API_URL}/mail_liste/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },

  update: async (id: number, data: Mail) => {
    const res = await fetch(`${API_URL}/mail_liste/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/mail_liste/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};
