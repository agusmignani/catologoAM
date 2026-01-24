import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, r as renderTemplate, j as renderComponent } from '../chunks/astro/server_Dy6vyZQc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C2QZyz_t.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  const hasStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isNew = product.id > 10;
  const isBestSeller = product.price > 5e3;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden 
  transition-all duration-300 hover:border-rose-300 ${!hasStock && "opacity-75"}`, "class")}> <div class="relative aspect-[3/4] overflow-hidden bg-neutral-800"> <div class="absolute top-3 left-3 z-10 flex flex-col gap-2"> ${isNew && renderTemplate`<span class="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Nuevo</span>`} ${isBestSeller && renderTemplate`<span class="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Más vendido</span>`} ${isLowStock && renderTemplate`<span class="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Pocas unidades</span>`} </div> <img${addAttribute(`http://127.0.0.1:8000${product.image_url}`, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover transition duration-500 group-hover:scale-110"> </div> <div class="p-4 space-y-3"> <div> <h3 class="text-sm font-medium tracking-wide text-neutral-100 uppercase truncate"> ${product.name} </h3> <p${addAttribute(`text-[11px] mt-1 ${hasStock ? "text-neutral-400" : "text-rose-500 font-bold"}`, "class")}> ${hasStock ? `Stock disponible: ${product.stock}` : "AGOTADO"} </p> </div> <div class="text-rose-300 font-bold text-lg">
$${product.price} </div> <div class="grid grid-cols-2 gap-2 pt-2"> <a${addAttribute(`/products/${product.id}`, "href")} class="text-center text-[11px] font-semibold bg-neutral-800 text-neutral-200 py-2 rounded-full hover:bg-neutral-700 transition">
Ver detalle
</a> ${hasStock ? renderTemplate`<a${addAttribute(`https://wa.me/5493571620225?text=\xA1Hola! Me interesa el producto: ${product.name}`, "href")} target="_blank" class="text-center text-[11px] font-semibold bg-rose-300 text-neutral-950 py-2 rounded-full hover:bg-rose-400 transition">
Consultar
</a>` : renderTemplate`<button disabled class="text-center text-[11px] font-semibold bg-neutral-800 text-neutral-500 py-2 rounded-full cursor-not-allowed">
Sin stock
</button>`} </div> </div> </article>`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/ProductCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const res = await fetch("http://127.0.0.1:8000/products");
  const productsData = await res.json();
  const products = productsData.sort((a, b) => {
    if (a.stock > 0 && b.stock === 0) return -1;
    if (a.stock === 0 && b.stock > 0) return 1;
    return 0;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="border-b border-neutral-800"> <div class="max-w-7xl mx-auto px-6 h-24 flex items-center"> <!-- Izquierda: logo + título --> <div class="flex items-center gap-4"> <!-- Logo --> <div class="w-12 h-12 rounded-full bg-rose-300 flex items-center justify-center overflow-hidden"> <img src="/images/am.png" alt="Logo AM" class="h-full w-auto"> </div> <!-- Título --> <div> <h1 class="text-lg font-medium tracking-wide">Catálogo AM</h1> <p class="text-xs text-neutral-400">Maquillaje</p> </div> </div> <!-- Derecha: icono de usuario --> <a href="/login" class="ml-auto w-10 h-10 rounded-full border border-rose-300 flex items-center justify-center
             text-rose-300 hover:bg-rose-300 hover:text-neutral-950 transition" title="Ingresar"> <!-- Icono SVG de usuario --> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </a> </div> </header>  <section class="py-24 text-center px-6"> <h2 class="text-4xl font-light tracking-wide">Belleza auténtica</h2> <p class="text-neutral-400 mt-2">Productos seleccionados para vos</p> </section>  <section class="px-6 pb-28"> <div class="max-w-7xl mx-auto"> ${products.length === 0 ? renderTemplate`<p class="text-center text-neutral-400">
No hay productos disponibles
</p>` : renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })}`)} </div>`} </div> </section>  <footer class="border-t border-neutral-800 py-10 text-center text-xs text-neutral-500">
© 2026 Catálogo AM
</footer> ` })}`;
}, "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
