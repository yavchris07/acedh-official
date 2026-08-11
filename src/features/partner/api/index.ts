const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const partnerApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/partenaire/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: FormData) => {
    const res = await fetch(`${API_URL}/partenaire/create/`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(`${API_URL}/partenaire/${id}/update/`, {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/partenaire/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};
