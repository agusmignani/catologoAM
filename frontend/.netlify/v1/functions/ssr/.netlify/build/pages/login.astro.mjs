import { d as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

function LoginForm() {
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.detail || "Credenciales incorrectas");
        return;
      }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("is_admin", data.is_admin);
      document.cookie = `auth_token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;
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
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-4", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm text-neutral-400 mb-1 font-medium", children: "Usuario" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "username",
          placeholder: "Tu usuario",
          required: true,
          className: "w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300/20 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm text-neutral-400 mb-1 font-medium", children: "Contraseña" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          name: "password",
          placeholder: "••••••••",
          required: true,
          className: "w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300/20 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "w-full py-3 rounded-full bg-rose-300 text-neutral-950 font-bold hover:bg-rose-400 transition-all duration-300 mt-2 disabled:opacity-60 disabled:cursor-wait active:scale-95 shadow-lg shadow-rose-300/10",
        children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4 text-neutral-950", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          "Ingresando..."
        ] }) : "Ingresar al Panel"
      }
    )
  ] });
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex justify-center items-center min-h-screen bg-neutral-950 px-4"> <div class="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg"> <h2 class="text-3xl font-semibold text-rose-300 text-center mb-6">
Iniciar sesión
</h2> ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/LoginForm.jsx", "client:component-export": "default" })} <p class="text-xs text-neutral-400 text-center mt-4">
¿No tienes cuenta?
<a href="/register" class="text-rose-300 hover:underline">
Regístrate
</a> </p> </div> </section> ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
