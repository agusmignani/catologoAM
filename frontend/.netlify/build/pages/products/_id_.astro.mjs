import { d as createComponent, e as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C2QZyz_t.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let product;
  let error = false;
  try {
    const res = await fetch(`http://127.0.0.1:8000/products/${id}`);
    if (!res.ok) {
      product = null;
    } else {
      product = await res.json();
    }
  } catch (e) {
    console.error("Error conectando con el servidor:", e);
    error = true;
  }
  if (!product || error) {
    return Astro2.redirect("/404");
  }
  const isLowStock = product.stock > 0 && product.stock <= 3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${product.name} | Cat\xE1logo AM` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-6 py-12 lg:py-20"> <a href="/" class="inline-flex items-center gap-2 text-neutral-500 hover:text-rose-300 transition mb-8 group"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M19 12H5M12 19l-7-7 7-7"></path> </svg>
Volver al catálogo
</a> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"> <div class="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"> <img${addAttribute(`http://127.0.0.1:8000${product.image_url}`, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"> </div> <div class="flex flex-col justify-center"> <div class="space-y-6"> <div class="space-y-2"> ${isLowStock && renderTemplate`<span class="text-amber-500 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
¡Pocas unidades disponibles!
</span>`} <h1 class="text-4xl md:text-5xl font-light text-white leading-tight"> ${product.name} </h1> </div> <p class="text-3xl text-rose-300 font-medium italic">
$${product.price} </p> <div class="prose prose-invert border-t border-neutral-800 pt-8"> <h3 class="text-neutral-500 text-sm uppercase tracking-widest mb-4 font-bold">Descripción</h3> <p class="text-neutral-400 text-lg leading-relaxed"> ${product.description || "Este producto ha sido seleccionado por su alta calidad y resultados profesionales. Ideal para resaltar tu belleza natural."} </p> </div> <div class="pt-8 space-y-4"> <div class="flex items-center gap-3"> <div${addAttribute(`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500"}`, "class")}></div> <p class="text-sm text-neutral-300"> ${product.stock > 0 ? `En stock (${product.stock} unidades)` : "Sin stock moment\xE1neamente"} </p> </div> ${product.stock > 0 ? renderTemplate`<a${addAttribute(`https://wa.me/5493571620225?text=\xA1Hola! Me interesa comprar el producto: ${product.name}`, "href")} target="_blank" class="block w-full text-center bg-rose-300 text-neutral-950 font-bold py-5 rounded-2xl hover:bg-rose-400 transition transform hover:-translate-y-1 active:scale-95 shadow-lg">
COMPRAR POR WHATSAPP
</a>` : renderTemplate`<button disabled class="w-full bg-neutral-800 text-neutral-500 font-bold py-5 rounded-2xl cursor-not-allowed">
SIN STOCK
</button>`} </div> </div> </div> </div> </main> ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/products/[id].astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/products/[id].astro";
const $$url = "/products/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
