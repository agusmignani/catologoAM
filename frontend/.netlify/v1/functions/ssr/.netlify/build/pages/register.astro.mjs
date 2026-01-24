import { d as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C2QZyz_t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.detail || "Error al registrar");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3e3);
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-green-400 font-medium", children: "Usuario registrado correctamente" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400", children: "Serás redirigido al inicio de sesión para que puedas ingresar" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/login",
          className: "mt-2 py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold hover:bg-rose-400 transition",
          children: "Ir al inicio de sesión"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-4", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm text-neutral-400 mb-1", children: "Usuario" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "username",
          required: true,
          className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm text-neutral-400 mb-1", children: "Contraseña" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          name: "password",
          required: true,
          className: "px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        disabled: loading,
        className: "py-3 rounded-full bg-rose-300 text-neutral-950 font-semibold disabled:opacity-60",
        children: loading ? "Registrando..." : "Registrarse"
      }
    )
  ] });
}

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex justify-center items-center min-h-screen bg-neutral-950 px-4"> <div class="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg"> <h2 class="text-3xl font-semibold text-rose-300 text-center mb-6">
Crear cuenta
</h2> ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/RegisterForm.jsx", "client:component-export": "default" })} <p class="text-xs text-neutral-400 text-center mt-4">
¿Ya tenés cuenta?
<a href="/register" class="text-rose-300 hover:underline">
Inicia Sesión
</a> </p> </div> </section> ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/register.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
