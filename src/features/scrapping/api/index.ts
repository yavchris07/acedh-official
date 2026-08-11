const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const scrapApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/quinouslisent/`);
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },
};
