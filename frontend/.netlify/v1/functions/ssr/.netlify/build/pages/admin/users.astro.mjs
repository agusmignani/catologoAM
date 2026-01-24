import { d as createComponent, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
    is_admin: false
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
  const loadUsers = async () => {
    const res = await fetch(`${API}/auth`);
    const data = await res.json();
    setUsers(data);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const resetForm = () => {
    setForm({ username: "", password: "", is_admin: false });
    setEditingId(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("username", form.username);
    fd.append("is_admin", form.is_admin);
    if (!editingId) {
      fd.append("password", form.password);
    }
    const url = editingId ? `${API}/auth/${editingId}` : `${API}/auth`;
    const method = editingId ? "PUT" : "POST";
    await fetch(url, { method, body: fd });
    resetForm();
    loadUsers();
    setLoading(false);
  };
  const editUser = (u) => {
    setEditingId(u.id);
    setForm({
      username: u.username,
      password: "",
      is_admin: u.is_admin
    });
  };
  const deleteUser = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    await fetch(`${API}/auth/${id}`, { method: "DELETE" });
    loadUsers();
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
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: logout,
          className: "mt-10 p-2 text-sm text-left text-red-400 hover:bg-red-500/10 rounded transition",
          children: "Cerrar sesión"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 ml-64 p-10 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-10 text-3xl font-black uppercase tracking-widest text-rose-300 text-center", children: "USUARIOS" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-rose-300 rounded-full" }),
            editingId ? "Editar usuario" : "Nuevo usuario"
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                placeholder: "Username",
                value: form.username,
                onChange: (e) => setForm({ ...form, username: e.target.value }),
                className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300",
                required: true
              }
            ),
            !editingId && /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                placeholder: "Contraseña",
                value: form.password,
                onChange: (e) => setForm({ ...form, password: e.target.value }),
                className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-300",
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-neutral-300", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: form.is_admin,
                  onChange: (e) => setForm({ ...form, is_admin: e.target.checked }),
                  className: "accent-rose-300"
                }
              ),
              "Administrador"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  disabled: loading,
                  className: "flex-1 py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition",
                  children: loading ? "Guardando..." : editingId ? "Actualizar" : "Crear"
                }
              ),
              editingId && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: resetForm,
                  className: "px-4 py-3 rounded-full bg-neutral-700 text-neutral-200",
                  children: "X"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl h-fit", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-rose-300 mb-6 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { children: "Usuarios registrados" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400", children: [
              users.length,
              " usuarios"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex flex-col gap-3 overflow-y-auto pr-2",
              style: {
                maxHeight: "540px",
                scrollbarWidth: "thin",
                scrollbarColor: "#262626 transparent"
              },
              children: users.map((u) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex justify-between items-center border border-neutral-800 rounded-xl p-3 bg-neutral-950/50 hover:border-rose-300 transition",
                  children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-bold text-neutral-100", children: u.username }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400", children: u.is_admin ? "Administrador" : "Usuario" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-xs font-bold uppercase text-right", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => editUser(u),
                          className: "text-rose-300 hover:text-rose-100",
                          children: "Editar"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => deleteUser(u.id),
                          className: "text-red-500 hover:text-red-400",
                          children: "Eliminar"
                        }
                      )
                    ] })
                  ]
                },
                u.id
              ))
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Users = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminUsers", AdminUsers, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminUsers.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/users.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
