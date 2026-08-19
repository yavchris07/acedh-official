const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const reportApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/rapport/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  get: async (id: number) => {
    const res = await fetch(`${API_URL}/document_detail/${id}/`);
    if (!res.ok) throw new Error("Erreur fetch activity");
    return res.json();
  },

  create: async (data: FormData) => {
    const res = await fetch(`${API_URL}/rapport/create/`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Erreur création rapport", { cause: res });
    return res.json();
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(`${API_URL}/rapport/${id}/update/`, {
      method: "PUT",
      body: data,
    });
    if (!res.ok) throw new Error("Erreur update rapport", { cause: res });
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/rapport/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete rapport", { cause: res });
    return true;
  },
};
