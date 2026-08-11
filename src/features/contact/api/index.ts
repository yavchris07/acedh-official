import type { Contact } from "../../../utils/type";

const API_URL = import.meta.env.VITE_API_URL;

export const contactApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/contact/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: Contact) => {
    const res = await fetch(`${API_URL}/contact/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création contact");
    return res.json();
  },

  update: async (id: number, data: Contact) => {
    const res = await fetch(`${API_URL}/contact/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update contact");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/contact/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};


