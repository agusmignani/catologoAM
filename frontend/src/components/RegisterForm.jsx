import { useState } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Error al registrar");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="text-green-400 font-medium">
          Usuario registrado correctamente
        </p>

        <p className="text-sm text-neutral-400">
          Serás redirigido al inicio de sesión para que puedas ingresar
        </p>

        <a
          href="/login"
          className="mt-2 py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition"
        >
          Ir al inicio de sesión
        </a>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1">Usuario</label>
        <input
          name="username"
          required
          className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          required
          className="px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
        />
      </div>

      <button
        disabled={loading}
        className="py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold disabled:opacity-60"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
