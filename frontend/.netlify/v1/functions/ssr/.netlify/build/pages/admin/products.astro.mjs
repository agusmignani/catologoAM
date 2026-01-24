import { d as createComponent, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    is_active: true,
    image: null
  });
  const API = "http://127.0.0.1:8000";
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
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/login";
  };
  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      is_active: true,
      image: null
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", parseFloat(form.price));
    formData.append("stock", parseInt(form.stock));
    formData.append("is_active", form.is_active);
    if (form.image) {
      formData.append("image", form.image);
    }
    const url = editingId ? `${API}/products/${editingId}` : `${API}/products`;
    const method = editingId ? "PUT" : "POST";
    const token2 = localStorage.getItem("token");
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token2}` },
        body: formData
      });
      if (res.ok) {
        await loadProducts();
        resetForm();
      } else {
        alert("Error al procesar la solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const editProduct = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      is_active: p.is_active,
      image: null
    });
  };
  const toggleActive = async (p) => {
    const token2 = localStorage.getItem("token");
    await fetch(`${API}/products/${p.id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token2}` }
    });
    loadProducts();
  };
  const deleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto permanentemente?")) return;
    const token2 = localStorage.getItem("token");
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token2}` }
    });
    loadProducts();
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-neutral-950 text-neutral-200 font-sans", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-rose-300 mb-8", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 text-sm flex-1", children: [
        /* @__PURE__ */ jsx("a", { href: "/admin", className: "p-2 rounded hover:bg-neutral-800", children: "Dashboard" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/products", className: "p-2 rounded bg-neutral-800 text-rose-300 font-bold", children: "Productos" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/users", className: "p-2 rounded hover:bg-neutral-800", children: "Usuarios" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/sales", className: "p-2 rounded hover:bg-neutral-800", children: "Ventas" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/stock", className: "p-2 rounded hover:bg-neutral-800", children: "Stock" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition font-medium", children: "Cerrar sesión" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 ml-64 p-10 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center", children: "Gestión de Productos" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("section", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2 italic", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-rose-300 rounded-full" }),
            editingId ? "Actualizar Datos" : "Nuevo Producto"
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                placeholder: "Nombre del producto",
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all",
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] text-rose-300/50 font-bold uppercase ml-2", children: "Venta" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  step: "0.01",
                  placeholder: "$ 0.00",
                  value: form.price,
                  onChange: (e) => setForm({ ...form, price: e.target.value }),
                  className: "px-4 py-3 rounded-xl bg-neutral-800 border border-rose-300/20 text-rose-100 focus:ring-2 focus:ring-rose-300 outline-none",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] text-neutral-500 font-bold uppercase ml-2", children: "Descripción" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  placeholder: "Descripción del producto",
                  value: form.description,
                  onChange: (e) => setForm({ ...form, description: e.target.value }),
                  className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-rose-300",
                  rows: 3,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] text-neutral-500 font-bold uppercase ml-2", children: "Stock Inicial" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Unidades (Cargar 0)",
                  value: form.stock,
                  onChange: (e) => setForm({ ...form, stock: e.target.value }),
                  className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none focus:ring-2 focus:ring-rose-300"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  ref: fileInputRef,
                  accept: "image/*",
                  onChange: (e) => setForm({ ...form, image: e.target.files[0] }),
                  className: "hidden",
                  id: "product-image"
                }
              ),
              /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "product-image",
                  className: "flex flex-col items-center justify-center gap-2 w-full p-6 rounded-xl bg-neutral-950 border-2 border-dashed border-neutral-800 group-hover:border-rose-300 transition-all cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📷" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400 font-medium", children: form.image ? form.image.name : "Seleccionar Imagen del Producto" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  disabled: loading,
                  className: "flex-1 py-3 rounded-full bg-rose-300 text-neutral-950 font-black uppercase tracking-widest hover:bg-rose-400 transition shadow-lg shadow-rose-300/10 disabled:opacity-50",
                  children: loading ? "PROCESANDO..." : editingId ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"
                }
              ),
              editingId && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: resetForm,
                  className: "px-6 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition",
                  children: "✕"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { children: "Inventario Actual" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400", children: [
              products.length,
              " Productos"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex flex-col gap-4 overflow-y-auto pr-2",
              style: {
                maxHeight: "540px",
                scrollbarWidth: "thin",
                scrollbarColor: "#262626 transparent"
              },
              children: products.map((p) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-4 border border-neutral-800 rounded-xl p-3 hover:border-rose-300 transition-all bg-neutral-950/50",
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: `${API}${p.image_url}`,
                        className: "w-16 h-16 object-cover rounded-lg bg-neutral-800",
                        alt: p.name
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-bold text-neutral-100 truncate", children: p.name }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-400 flex flex-wrap gap-x-2", children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Costo: $",
                          p.cost_price
                        ] }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Venta: ",
                          /* @__PURE__ */ jsxs("b", { className: "text-rose-200", children: [
                            "$",
                            p.price
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-[10px] mt-1 flex gap-2 uppercase font-bold", children: /* @__PURE__ */ jsxs("span", { className: p.stock < 5 ? "text-rose-400" : "text-green-500", children: [
                        "Disponible: ",
                        p.stock
                      ] }) }),
                      p.order_number && /* @__PURE__ */ jsxs("span", { className: "text-[10px] bg-neutral-800 text-neutral-400 px-1 rounded mt-1 inline-block", children: [
                        "Pedido #",
                        p.order_number
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-right text-[10px] font-bold uppercase", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => editProduct(p), className: "text-rose-300 hover:text-rose-100 transition", children: "Editar" }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => toggleActive(p),
                          className: p.is_active ? "text-yellow-600 hover:text-yellow-400" : "text-green-600",
                          children: p.is_active ? "Desactivar" : "Activar"
                        }
                      ),
                      /* @__PURE__ */ jsx("button", { onClick: () => deleteProduct(p.id), className: "text-red-800 hover:text-red-500", children: "Borrar" })
                    ] })
                  ]
                },
                p.id
              ))
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Products = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminProducts", AdminProducts, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminProducts.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/products.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
