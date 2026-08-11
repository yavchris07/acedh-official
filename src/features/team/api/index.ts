const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const teamApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/team/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  create: async (data: FormData) => {
    const res = await fetch(`${API_URL}/team/create/`, {
      method: "POST",

      body: data,
    });
    if (!res.ok) throw new Error("Erreur création user");
    return res.json();
  },

  //   create: async (formData: FormData) => {
  //   const res = await fetch(`${API_URL}/team/create/`, {
  //     method: "POST",
  //     body: formData, // ✅ ici
  //   });

  //   if (!res.ok) throw new Error("Erreur création user");
  //   return res.json();
  // },

  update: async (id: number, data: FormData) => {
    const res = await fetch(`${API_URL}/team/${id}/update/`, {
      method: "PUT",
      body: data,
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/team/${id}/delete/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return true;
  },
};
