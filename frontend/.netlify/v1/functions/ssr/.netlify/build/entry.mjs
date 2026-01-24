import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CMbWaEyF.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/products.astro.mjs');
const _page3 = () => import('./pages/admin/sales.astro.mjs');
const _page4 = () => import('./pages/admin/stock.astro.mjs');
const _page5 = () => import('./pages/admin/users.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/products/_id_.astro.mjs');
const _page9 = () => import('./pages/register.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/products.astro", _page2],
    ["src/pages/admin/sales.astro", _page3],
    ["src/pages/admin/stock.astro", _page4],
    ["src/pages/admin/users.astro", _page5],
    ["src/pages/admin.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/products/[id].astro", _page8],
    ["src/pages/register.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "fae599b9-60b7-4099-ad35-88a70c8ca43c"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
