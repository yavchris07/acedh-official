const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const resourceApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/ressource/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: FormData) => {
    const res = await fetch(`${API_URL}/ressource/create/`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(`${API_URL}/ressource/${id}/update/`, {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error("Erreur update resource");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/ressource/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete resource");
    return true;
  },
};
