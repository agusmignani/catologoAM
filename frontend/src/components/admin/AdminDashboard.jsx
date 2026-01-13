import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Cell
} from "recharts";

const API = "http://localhost:8000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

useEffect(() => {
  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token"); //
    
    if (!token) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/sales/dashboard`, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`, // Esto es lo que falta
          "Content-Type": "application/json"
        },
      });

      if (res.status === 401) {
        logout(); // Si el token expiró, mandarlo al login
        return;
      }

      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-rose-300 animate-pulse font-black">CARGANDO DASHBOARD...</div>;

  if (error) {
    return (
      <div className="text-red-400 p-10 bg-neutral-950 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold">⚠️ Error: {error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-neutral-800 rounded-lg text-white">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-200 font-sans">
      
      {/* 🧭 SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full">
        <h2 className="text-2xl font-semibold text-rose-300 mb-8 tracking-tighter">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-sm flex-1">
          <a href="/admin" className="p-2 rounded bg-neutral-800 text-rose-300 font-bold italic">Dashboard</a>
          <a href="/admin/products" className="p-2 rounded hover:bg-neutral-800 transition">Productos</a>
          <a href="/admin/users" className="p-2 rounded hover:bg-neutral-800 transition">Usuarios</a>
          <a href="/admin/sales" className="p-2 rounded hover:bg-neutral-800 transition">Ventas</a>
          <a href="/admin/stock" className="p-2 rounded hover:bg-neutral-800 transition">Stock</a>
        </nav>
        <button onClick={logout} className="mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium">
          Cerrar sesión
        </button>
      </aside>

      {/* 📊 CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-100">Resumen Operativo</h1>
              <p className="text-rose-300/60 font-medium italic">Estadísticas de ventas y rendimiento en tiempo real</p>
            </div>
            <div className="text-right">
                <span className="text-[10px] text-neutral-500 font-bold block uppercase">Estado del Sistema</span>
                <span className="text-xs text-green-500 font-bold flex items-center justify-end gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> ONLINE
                </span>
            </div>
          </header>

          {/* ⚡ CARDS DE MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl">
              <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Ventas Totales</p>
              <h3 className="text-3xl font-black text-white">${stats.summary.total_vendido.toLocaleString()}</h3>
              <div className="mt-2 text-[10px] text-rose-300 bg-rose-300/10 w-fit px-2 py-0.5 rounded-full">Bruto acumulado</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl">
              <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Inversión en Stock</p>
              <h3 className="text-3xl font-black text-neutral-300">${stats.summary.total_invertido.toLocaleString()}</h3>
              <div className="mt-2 text-[10px] text-neutral-500 bg-neutral-800 w-fit px-2 py-0.5 rounded-full">Costo de mercancía</div>
            </div>

            <div className="bg-neutral-900 border border-rose-300/20 p-6 rounded-3xl shadow-xl bg-gradient-to-br from-neutral-900 to-rose-950/20">
              <p className="text-xs font-bold text-rose-300 uppercase mb-1">Ganancia Neta</p>
              <h3 className="text-3xl font-black text-rose-300">${stats.summary.ganancia.toLocaleString()}</h3>
              <div className="mt-2 text-[10px] text-green-400 bg-green-400/10 w-fit px-2 py-0.5 rounded-full">Margen positivo</div>
            </div>
          </div>

          {/* 📈 GRÁFICOS */}
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Gráfico de Línea: Ventas por Día */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-lg">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-300 rounded-full shadow-[0_0_8px_rgba(253,164,186,0.6)]"></span>
                Histórico de Ingresos
              </h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.by_day}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis dataKey="date" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '12px' }}
                      itemStyle={{ color: '#fda4af', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="total" stroke="#fda4af" strokeWidth={4} dot={{ fill: '#fda4af', r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico de Barras: Top Productos */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-lg">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-neutral-100 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"></span>
                Productos Más Vendidos
              </h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.top_products} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="product" type="category" stroke="#a3a3a3" fontSize={10} width={80} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#262626'}} contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="quantity" radius={[0, 10, 10, 0]} barSize={20}>
                      {stats.top_products.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#fda4af' : '#404040'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}