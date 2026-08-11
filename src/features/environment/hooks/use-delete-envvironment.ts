import { useState } from "react";
import { environmentApi } from "../api";

export const useDeleteEnvironment = () => {
    const [pending, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deleteEnvironment = async (id: number) => {
        try {
            setLoading(true);
            setError("");
            await environmentApi.delete(id);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.error("Delete stat error:", err);
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteEnvironment, pending, error };
};