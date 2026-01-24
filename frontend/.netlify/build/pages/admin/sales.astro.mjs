import { d as createComponent, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API = "http://127.0.0.1:8000";
function AdminSales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [saleType, setSaleType] = useState("individual");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [hasPackaging, setHasPackaging] = useState(false);
  const [packagingPrice, setPackagingPrice] = useState("");
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
    if (!token) return;
    fetch(`${API}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => res.json()).then((data) => setProducts(data.filter((p) => p.is_active)));
    loadSales();
  }, [token]);
  const loadSales = async () => {
    if (!token) return;
    const res = await fetch(`${API}/sales`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSales(await res.json());
  };
  const selectedProduct = products.find((p) => p.id == productId);
  useEffect(() => {
    if (selectedProduct) {
      setPrice(selectedProduct.price);
    }
  }, [productId]);
  const addToCart = () => {
    if (!selectedProduct || quantity <= 0) return;
    const currentPrice = Number(price);
    const currentPkg = hasPackaging ? Number(packagingPrice) : 0;
    const itemSubtotal = quantity * currentPrice + currentPkg;
    setCart([
      ...cart,
      {
        product_id: selectedProduct.id,
        name: selectedProduct.name,
        quantity: Number(quantity),
        unit_price: currentPrice,
        // IMPORTANTE: Envia el precio de costo actual del producto
        cost_price: selectedProduct.cost_price || 0,
        subtotal: itemSubtotal,
        sale_type: saleType,
        has_packaging: hasPackaging,
        packaging_price: currentPkg
      }
    ]);
    setQuantity(1);
    setHasPackaging(false);
    setPackagingPrice("");
    setProductId("");
  };
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };
  const totalVenta = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const submitSale = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken || cart.length === 0) return;
    try {
      const res = await fetch(`${API}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`
        },
        body: JSON.stringify({
          total: totalVenta,
          payment_method: paymentMethod,
          items: cart.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            cost_price: i.cost_price,
            subtotal: i.subtotal,
            sale_type: i.sale_type,
            has_packaging: i.has_packaging,
            packaging_price: i.packaging_price
          }))
        })
      });
      if (res.ok) {
        setCart([]);
        setPaymentMethod("efectivo");
        loadSales();
        alert("Venta registrada con éxito");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.detail || "No se pudo registrar"}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteSale = async (id) => {
    if (!confirm("¿Eliminar registro de venta?") || !token) return;
    await fetch(`${API}/sales/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadSales();
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/login";
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-neutral-950 text-neutral-200 font-sans", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-rose-300 mb-8", children: "Admin Panel" }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 text-sm flex-1", children: [
        /* @__PURE__ */ jsx("a", { href: "/admin", className: "p-2 rounded hover:bg-neutral-800", children: "Dashboard" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/products", className: "p-2 rounded hover:bg-neutral-800", children: "Productos" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/users", className: "p-2 rounded hover:bg-neutral-800", children: "Usuarios" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/sales", className: "p-2 rounded hover:bg-neutral-800", children: "Ventas" }),
        /* @__PURE__ */ jsx("a", { href: "/admin/stock", className: "p-2 rounded hover:bg-neutral-800", children: "Stock" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded font-medium", children: "Cerrar sesión" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 ml-64 p-10 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center", children: "Ventas" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-rose-300 rounded-full" }),
            " Nueva Operación"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: productId,
                onChange: (e) => setProductId(e.target.value),
                className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 outline-none focus:ring-2 focus:ring-rose-300",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar producto" }),
                  products.map((p) => /* @__PURE__ */ jsxs("option", { value: p.id, children: [
                    p.name,
                    " (Stock: ",
                    p.stock,
                    ")"
                  ] }, p.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx("input", { type: "number", value: quantity, onChange: (e) => setQuantity(e.target.value), className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700", placeholder: "Cantidad" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: price, onChange: (e) => setPrice(e.target.value), className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700", placeholder: "Precio Venta" })
            ] }),
            /* @__PURE__ */ jsxs("select", { value: saleType, onChange: (e) => setSaleType(e.target.value), className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700", children: [
              /* @__PURE__ */ jsx("option", { value: "individual", children: "Venta Individual" }),
              /* @__PURE__ */ jsx("option", { value: "combo", children: "Combo / Promoción" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-neutral-950/50 rounded-xl border border-neutral-800", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 text-sm text-neutral-300 cursor-pointer mb-2", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", checked: hasPackaging, onChange: (e) => setHasPackaging(e.target.checked), className: "w-4 h-4 accent-rose-300" }),
                "¿Sumar Packaging?"
              ] }),
              hasPackaging && /* @__PURE__ */ jsx("input", { type: "number", value: packagingPrice, onChange: (e) => setPackagingPrice(e.target.value), className: "w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-rose-200", placeholder: "Precio empaque" })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: addToCart, className: "py-3 rounded-full bg-neutral-800 text-rose-300 border border-rose-300/30 font-bold hover:bg-rose-300 hover:text-neutral-950 transition-all", children: "+ Agregar Item" }),
            cart.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 border border-rose-300/20 bg-rose-300/5 rounded-2xl", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-4", children: cart.map((i, idx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-neutral-300", children: [
                  i.name,
                  " x",
                  i.quantity,
                  " ",
                  /* @__PURE__ */ jsxs("small", { className: "text-neutral-500", children: [
                    "(",
                    i.sale_type,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                    "$",
                    i.subtotal
                  ] }),
                  /* @__PURE__ */ jsx("button", { onClick: () => removeItem(idx), className: "text-red-500", children: "✕" })
                ] })
              ] }, idx)) }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-neutral-500 uppercase block mb-2", children: "Método de Pago" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["efectivo", "transferencia"].map((method) => /* @__PURE__ */ jsx("button", { onClick: () => setPaymentMethod(method), className: `py-2 rounded-lg text-xs font-bold border transition-all ${paymentMethod === method ? "bg-rose-300 text-neutral-950 border-rose-300" : "bg-neutral-800 text-neutral-400 border-neutral-700"}`, children: method.toUpperCase() }, method)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-rose-300/20 flex justify-between items-center font-bold", children: [
                /* @__PURE__ */ jsx("span", { children: "TOTAL VENTA" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xl text-rose-300", children: [
                  "$",
                  totalVenta
                ] })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: submitSale, className: "w-full mt-4 py-3 rounded-full bg-rose-300 text-neutral-950 font-black uppercase tracking-widest hover:bg-rose-400 transition-all", children: "Confirmar Venta" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { children: "Ventas Recientes" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-400 font-bold uppercase tracking-tighter", children: [
              sales.length,
              " operadas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 overflow-y-auto pr-2 max-h-[550px] custom-scrollbar", children: sales.map((s) => /* @__PURE__ */ jsxs("div", { className: "border border-neutral-800 rounded-xl p-4 bg-neutral-950/50 hover:border-rose-300/40 transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-neutral-500 uppercase", children: [
                  "Ticket #",
                  s.id
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-[9px] bg-neutral-800 text-rose-300 px-2 py-0.5 rounded-full mt-1 font-bold uppercase w-fit", children: s.payment_method })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => deleteSale(s.id), className: "text-red-900 hover:text-red-500 text-[10px] font-bold uppercase", children: "Eliminar" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-3", children: s.items && s.items.map((i, idx) => /* @__PURE__ */ jsxs("div", { className: "text-xs border-b border-neutral-800 pb-1 last:border-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-neutral-200", children: [
                  i.product_name,
                  " x",
                  i.quantity
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-neutral-300", children: [
                  "$",
                  i.subtotal
                ] })
              ] }),
              i.has_packaging && /* @__PURE__ */ jsx("div", { className: "text-[9px] text-rose-400/70", children: "+ Packaging incluido" })
            ] }, idx)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[9px] text-neutral-600 font-bold uppercase", children: "Monto Total" }),
              /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-rose-300", children: [
                "$",
                s.total
              ] })
            ] })
          ] }, s.id)) })
        ] })
      ] })
    ] }) })
  ] });
}

const $$Sales = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminSales", AdminSales, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminSales.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/sales.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/sales.astro";
const $$url = "/admin/sales";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sales,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
