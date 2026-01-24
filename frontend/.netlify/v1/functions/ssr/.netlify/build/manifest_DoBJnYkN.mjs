import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { n as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_Dy6vyZQc.mjs';
import 'clsx';
import './chunks/shared_9gEenf6c.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/","cacheDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/node_modules/.astro/","outDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/dist/","srcDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/src/","publicDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/public/","buildClientDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/dist/","buildServerDir":"file:///C:/Users/Agustina%20Mignani/Proyectos/CatalogoAM/frontend/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/admin/products","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products.astro","pathname":"/admin/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/admin/sales","isIndex":false,"type":"page","pattern":"^\\/admin\\/sales\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"sales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/sales.astro","pathname":"/admin/sales","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/admin/stock","isIndex":false,"type":"page","pattern":"^\\/admin\\/stock\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"stock","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/stock.astro","pathname":"/admin/stock","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/admin/users","isIndex":false,"type":"page","pattern":"^\\/admin\\/users\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/users.astro","pathname":"/admin/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/products/[id]","isIndex":false,"type":"page","pattern":"^\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/products/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DsK8c3B4.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/products.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/sales.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/stock.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/admin/users.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/products/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/pages/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin/products@_@astro":"pages/admin/products.astro.mjs","\u0000@astro-page:src/pages/admin/sales@_@astro":"pages/admin/sales.astro.mjs","\u0000@astro-page:src/pages/admin/stock@_@astro":"pages/admin/stock.astro.mjs","\u0000@astro-page:src/pages/admin/users@_@astro":"pages/admin/users.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/products/[id]@_@astro":"pages/products/_id_.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DoBJnYkN.mjs","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminSales.jsx":"_astro/AdminSales.vMS4V4r6.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminProducts.jsx":"_astro/AdminProducts.CB4Ic5hO.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/LoginForm.jsx":"_astro/LoginForm.De9gYz4M.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminStock.jsx":"_astro/AdminStock.Bfwc1FSa.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminUsers.jsx":"_astro/AdminUsers.-nVHiHbU.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/admin/AdminDashboard.jsx":"_astro/AdminDashboard.CeEyxDnt.js","C:/Users/Agustina Mignani/Proyectos/CatalogoAM/frontend/src/components/RegisterForm.jsx":"_astro/RegisterForm.CGi8BvMZ.js","@astrojs/react/client.js":"_astro/client.CfQHnMcm.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/admin.DsK8c3B4.css","/favicon.svg","/images/am.png","/images/logoam.png","/_astro/AdminDashboard.CeEyxDnt.js","/_astro/AdminProducts.CB4Ic5hO.js","/_astro/AdminSales.vMS4V4r6.js","/_astro/AdminStock.Bfwc1FSa.js","/_astro/AdminUsers.-nVHiHbU.js","/_astro/client.CfQHnMcm.js","/_astro/index.BfkTPTwy.js","/_astro/index.Bwx26VoV.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LoginForm.De9gYz4M.js","/_astro/RegisterForm.CGi8BvMZ.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"jtwHzDHob46cnwG7DSZWwNPvzhZi3u8Mm7uWsyqvPXE=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
