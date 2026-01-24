import { d as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C2QZyz_t.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Producto no encontrado" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="h-[70vh] flex flex-col items-center justify-center text-center px-6"> <h1 class="text-6xl font-bold text-rose-300 mb-4">404</h1> <p class="text-xl text-neutral-400 mb-8">¡Ups! El producto que buscas no existe o fue retirado.</p> <a href="/" class="bg-rose-300 text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-rose-400 transition">
Volver al catálogo
</a> </main> ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/404.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
