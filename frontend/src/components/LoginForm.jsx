import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Credenciales incorrectas");
        return;
      }

      // 👉 guardar token y rol
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("is_admin", data.is_admin);

      // 👉 redirección según rol
      if (data.is_admin === 1 || data.is_admin === true) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Usuario */}
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1">Usuario</label>
        <input
          type="text"
          name="username"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 transition"
        />
      </div>

      {/* Contraseña */}
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 transition"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition mt-2 disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
