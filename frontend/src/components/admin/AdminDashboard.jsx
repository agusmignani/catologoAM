import { useEffect } from "react";

export default function AdminDashboard() {
  useEffect(() => {
    const isAdmin = localStorage.getItem("is_admin");

    if (isAdmin !== "1" && isAdmin !== "true") {
      alert("No tenés permisos para acceder");
      window.location.href = "/";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    window.location.href = "/login";
  };

  return (
    <section className="min-h-screen bg-neutral-950 text-neutral-200 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <a href="/admin" className="hover:text-rose-300 transition">
            Dashboard
          </a>
          <a href="/admin/products" className="hover:text-rose-300 transition">
            Productos
          </a>
          <a href="/admin/users" className="hover:text-rose-300 transition">
            Usuarios
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-10 text-sm text-red-400 hover:text-red-500 transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4">
          Bienvenida al panel de administración
        </h1>

        <p className="text-neutral-400 max-w-xl">
          Desde acá vas a poder gestionar productos, usuarios y ventas.
        </p>
      </main>
    </section>
  );
}
