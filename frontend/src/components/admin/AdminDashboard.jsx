import { useEffect, useState } from "react";

const API = "http://localhost:8000";

export default function AdminDashboard() {
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No hay sesión activa");
      return;
    }

    // 🔒 Más adelante volvemos a habilitar los fetch
  }, []);

  if (error) {
    return (
      <div className="text-red-400 p-10 bg-neutral-950 min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800">
            Dashboard
          </a>
          <a href="/admin/products" className="p-2 rounded hover:bg-neutral-800">
            Productos
          </a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800">
            Usuarios
          </a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800">
            Ventas
          </a>
          <a href="/admin/stock" className="p-2 rounded hover:bg-neutral-800">
            Stock
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-neutral-400">
          Dashboard en construcción
        </p>
      </main>
    </div>
  );
}
