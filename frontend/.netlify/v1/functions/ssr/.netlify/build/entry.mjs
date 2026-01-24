import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DoBJnYkN.mjs';
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
    "middlewareSecret": "c5de1a37-4be6-4ac9-818e-fc58dec43baf"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
