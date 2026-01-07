import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from "recharts";

const API = "http://localhost:8000";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [byDay, setByDay] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState(null);

  // 1. Función de Cerrar Sesión corregida
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

    const headers = { Authorization: `Bearer ${token}` };

    // Petición al dashboard (Resumen)
    fetch(`${API}/sales/dashboard`, { headers })
      .then(r => {
        if (!r.ok) throw new Error("Error al obtener dashboard");
        return r.json();
      })
      .then(setDashboard)
      .catch(err => setError(err.message));

    // Petición Ventas por día
    fetch(`${API}/sales/by-day`, { headers })
      .then(r => r.json())
      .then(setByDay)
      .catch(console.error);

    // Petición Top Productos
    fetch(`${API}/sales/top-products`, { headers })
      .then(r => r.json())
      .then(setTopProducts)
      .catch(console.error);
  }, []);

  // Manejo de estados de carga y error
  if (error) return <div className="text-red-400 p-10 bg-neutral-950 min-h-screen">Error: {error}</div>;
  if (!dashboard) return <div className="text-white p-10 bg-neutral-950 min-h-screen">Cargando...</div>;

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">

      {/* 🧭 SIDEBAR CORREGIDO */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Dashboard
          </a>
          <a href="/admin/products" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Productos
          </a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Usuarios
          </a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800 hover:text-rose-300 transition">
            Ventas
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* 📊 CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-10 space-y-10 overflow-y-auto">

        <header>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-neutral-400">Resumen general de ventas y rendimiento</p>
        </header>

        {/* TARJETAS - Acceso corregido a .summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total vendido" value={`$${dashboard.summary.total_vendido.toLocaleString()}`} />
          <Card title="Total invertido" value={`$${dashboard.summary.total_invertido.toLocaleString()}`} />
          <Card title="Ganancia" value={`$${dashboard.summary.ganancia.toLocaleString()}`} />
        </section>

        {/* PRODUCTO TOP - Acceso corregido al array */}
        <section className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-semibold mb-2 text-neutral-400">Producto más vendido</h3>
          <p className="text-rose-300 text-2xl font-bold">
            {dashboard.top_products && dashboard.top_products.length > 0
              ? `${dashboard.top_products[0].product} (${dashboard.top_products[0].quantity} u.)`
              : "Sin datos"}
          </p>
        </section>

        {/* GRÁFICOS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-semibold mb-4 text-neutral-400">Ventas por día</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={byDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{backgroundColor: '#171717', border: '#333'}} />
                    <Line type="monotone" dataKey="total" stroke="#fb7185" strokeWidth={2} />
                </LineChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-semibold mb-4 text-neutral-400">Top 5 Productos</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{backgroundColor: '#171717', border: '#333'}} />
                    <Bar dataKey="total" fill="#fb7185" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-sm">
      <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold text-rose-300">{value}</p>
    </div>
  );
}