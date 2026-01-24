import { d as createComponent, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API = "http://127.0.0.1:8000";
function AdminStock() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (!t) {
        window.location.href = "/login";
      } else {
        setToken(t);
      }
    }
  }, []);
  useEffect(() => {
    if (token) {
      fetch(`${API}/products`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json()).then((data) => setProducts(data));
    }
  }, [token]);
  const submitStock = async (e) => {
    e.preventDefault();
    const url = `${API}/stock/?product_id=${productId}&quantity=${quantity}&cost_price=${costPrice}&order_number=${orderNumber}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      alert("¡Stock cargado!");
      window.location.reload();
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/login";
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-neutral-950 text-neutral-200", children: [
    /* @__PURE__ */ jsxs("aside", { className: "fixed inset-y-0 left-0 w-64 border-r border-neutral-800 bg-neutral-900 p-6 flex flex-col z-50", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-8 text-2xl font-bold text-rose-300 tracking-tight", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 text-sm flex-1", children: [
        /* @__PURE__ */ jsx("a", { href: "/admin", className: "p-2 rounded hover:bg-neutral-800", children: "Dashboard" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/products", className: "p-2 rounded hover:bg-neutral-800", children: "Productos" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/users", className: "p-2 rounded hover:bg-neutral-800", children: "Usuarios" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/sales", className: "p-2 rounded hover:bg-neutral-800", children: "Ventas" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/stock", className: "p-2 rounded hover:bg-neutral-800", children: "Stock" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium", children: "Cerrar sesión" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "pl-64 flex-1 w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-10 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center", children: "Inventario" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-6 text-lg font-bold text-rose-300 italic flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-rose-300 rounded-full" }),
            "Ingreso de Stock"
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitStock, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white focus:border-rose-300 focus:ring-1 focus:ring-rose-300 outline-none",
                value: productId,
                onChange: (e) => setProductId(e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Producto..." }),
                  products.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Cantidad",
                  className: "w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300",
                  value: quantity,
                  onChange: (e) => setQuantity(e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Costo",
                  className: "w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300",
                  value: costPrice,
                  onChange: (e) => setCostPrice(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "N° Pedido",
                className: "w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-rose-300",
                value: orderNumber,
                onChange: (e) => setOrderNumber(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "mt-4 w-full rounded-full bg-rose-300 py-3 text-sm font-black uppercase tracking-tighter text-neutral-950 hover:bg-rose-400 transition-colors", children: "Confirmar Operación" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-neutral-800 bg-neutral-900 p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-lg font-bold text-rose-300 italic", children: "Estado Actual" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex flex-col gap-4 overflow-y-auto pr-2",
              style: {
                maxHeight: "540px",
                scrollbarWidth: "thin",
                scrollbarColor: "#262626 transparent"
              },
              children: products.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 border-b border-neutral-800 last:border-0 hover:bg-neutral-800/30 transition-colors", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-neutral-300", children: p.name }),
                /* @__PURE__ */ jsxs("span", { className: `text-xs font-bold px-2 py-1 rounded ${p.stock <= 5 ? "text-red-400 bg-red-400/10" : "text-rose-300 bg-rose-300/10"}`, children: [
                  p.stock,
                  " unidades"
                ] })
              ] }, p.id))
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Stock = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminStock", AdminStock, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminStock.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/stock.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/stock.astro";
const $$url = "/admin/stock";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Stock,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
