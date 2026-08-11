import type { User } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const userApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/user/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: User) => {
    const res = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },

  update: async (id: number, data: User) => {

    const res = await fetch(`${API_URL}/change-password/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/user/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return res.json();
  },
};
