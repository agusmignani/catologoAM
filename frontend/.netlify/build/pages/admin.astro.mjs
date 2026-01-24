import { d as createComponent, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C2QZyz_t.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar, Cell } from 'recharts';
export { renderers } from '../renderers.mjs';

const API = "http://localhost:8000";
function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/login";
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay sesión activa");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API}/sales/dashboard`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.status === 401) {
          logout();
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
  if (loading) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-neutral-950 flex items-center justify-center text-rose-300 animate-pulse font-black", children: "CARGANDO..." });
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "text-red-400 p-10 bg-neutral-950 min-h-screen flex flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold", children: [
        "Error: ",
        error
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => window.location.reload(), className: "px-4 py-2 bg-neutral-800 rounded-lg text-white", children: "Reintentar" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-neutral-950 text-neutral-200 font-sans", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-rose-300 mb-8 tracking-tighter", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 text-sm flex-1", children: [
        /* @__PURE__ */ jsx("a", { href: "/admin", className: "p-2 rounded bg-neutral-800 text-rose-300 font-bold italic", children: "Dashboard" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/products", className: "p-2 rounded hover:bg-neutral-800 transition", children: "Productos" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/users", className: "p-2 rounded hover:bg-neutral-800 transition", children: "Usuarios" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/sales", className: "p-2 rounded hover:bg-neutral-800 transition", children: "Ventas" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/stock", className: "p-2 rounded hover:bg-neutral-800 transition", children: "Stock" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium", children: "Cerrar sesión" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 ml-64 p-10 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-10 flex justify-between items-end", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black uppercase tracking-tighter text-neutral-100", children: "Resumen Operativo" }),
          /* @__PURE__ */ jsx("p", { className: "text-rose-300/60 font-medium italic", children: "Estadísticas de ventas y rendimiento en tiempo real" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-500 font-bold block uppercase", children: "Estado del Sistema" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-green-500 font-bold flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-ping" }),
            " ONLINE"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-neutral-500 uppercase mb-1", children: "Ventas Totales" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-black text-white", children: [
            "$",
            stats.summary.total_vendido.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-[10px] text-rose-300 bg-rose-300/10 w-fit px-2 py-0.5 rounded-full", children: "Bruto acumulado" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-neutral-500 uppercase mb-1", children: "Inversión en Stock" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-black text-neutral-300", children: [
            "$",
            stats.summary.total_invertido.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-[10px] text-neutral-500 bg-neutral-800 w-fit px-2 py-0.5 rounded-full", children: "Costo de mercancía" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-rose-300/20 p-6 rounded-3xl shadow-xl bg-gradient-to-br from-neutral-900 to-rose-950/20", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-rose-300 uppercase mb-1", children: "Ganancia Neta" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-black text-rose-300", children: [
            "$",
            stats.summary.ganancia.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-[10px] text-green-400 bg-green-400/10 w-fit px-2 py-0.5 rounded-full", children: "Margen positivo" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-lg", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-rose-300 rounded-full shadow-[0_0_8px_rgba(253,164,186,0.6)]" }),
            "Histórico de Ingresos"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: stats.by_day, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#262626", vertical: false }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "date", stroke: "#525252", fontSize: 10, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsx(YAxis, { stroke: "#525252", fontSize: 10, tickLine: false, axisLine: false, tickFormatter: (value) => `$${value}` }),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: { backgroundColor: "#171717", border: "1px solid #404040", borderRadius: "12px" },
                itemStyle: { color: "#fda4af", fontWeight: "bold" }
              }
            ),
            /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "total", stroke: "#fda4af", strokeWidth: 4, dot: { fill: "#fda4af", r: 4 }, activeDot: { r: 8 } })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-lg", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-neutral-100 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" }),
            "Productos Más Vendidos"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: stats.top_products, layout: "vertical", children: [
            /* @__PURE__ */ jsx(XAxis, { type: "number", hide: true }),
            /* @__PURE__ */ jsx(YAxis, { dataKey: "product", type: "category", stroke: "#a3a3a3", fontSize: 10, width: 80, axisLine: false, tickLine: false }),
            /* @__PURE__ */ jsx(Tooltip, { cursor: { fill: "#262626" }, contentStyle: { backgroundColor: "#171717", border: "none", borderRadius: "8px" } }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "quantity", radius: [0, 10, 10, 0], barSize: 20, children: stats.top_products.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: index === 0 ? "#fda4af" : "#404040" }, `cell-${index}`)) })
          ] }) }) })
        ] })
      ] })
    ] }) })
  ] });
}

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminDashboard", AdminDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminDashboard.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
