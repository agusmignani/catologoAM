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

      // 1. Guardamos en localStorage para uso del cliente (React)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("is_admin", data.is_admin);

      // 2. CREAMOS LA COOKIE PARA EL MIDDLEWARE (Servidor)
      // Nombre: auth_token | Expira en 1 hora | Accesible en todo el sitio
      document.cookie = `auth_token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;

      // 3. Redirección según rol
      // Verificamos tanto si es número 1 como si es booleano true
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
      {/* Campo Usuario */}
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1 font-medium">Usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Tu usuario"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300/20 transition"
        />
      </div>

      {/* Campo Contraseña */}
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400 mb-1 font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300/20 transition"
        />
      </div>

      {/* Botón de Ingreso */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-rose-300 text-neutral-950 font-bold hover:bg-rose-400 transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-wait active:scale-95 shadow-lg shadow-rose-300/10"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ingresando...
          </span>
        ) : (
          "Ingresar al Panel"
        )}
      </button>
    </form>
  );
}