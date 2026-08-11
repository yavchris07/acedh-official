import React, { useState } from "react";
import { useAuth } from "../features/auth/hooks/use-auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ id: 0, email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useNavigate();

  const { authUser, pending } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await authUser(formData);
      console.log('xxx :',user);
      localStorage.setItem("userEmail", user.message);
      router("/dashboards");
    } catch (err) {
      setError("Email ou mot de passe incorrect ⭐");
      console.log(err);
    } finally {
      console.log("auth");
    }
  };

  return (
    // w-full md:h-full md:w-3/5
    <div className="flex items-center justify-center">
      <div className="w-115 p-5 rounded-lg ">
        <h3 className="text-green-700 text-2xl mb-5 font-semibold">
          SE CONNECTER
        </h3>
        <p className="text-gray-500 mb-3 text-sm">
          Se connecter pour gerer les contenus du site web, tout est
          personnalisable, avec cette partie le site demeure toujours a jour.
        </p>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-green-700 text-sm my-3">
              {" "}
              Email
            </label>
            <input
              type="text"
              className="border-2 py-2 rounded text-gray-800 px-3 border-green-700"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="text-green-700 text-sm my-3">
              {" "}
              Mot de passe
            </label>
            <input
              type="password"
              className="border-2 py-2 rounded text-gray-800 px-3 border-green-700"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 px-10 py-3 cursor-pointer rounded text-zinc-50"
          >
            {pending ? "..." : "Connexion"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
