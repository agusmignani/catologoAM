import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;

  // 1. Definí qué rutas querés proteger.
  // Por ejemplo: "/admin", "/productos/nuevo", "/dashboard", etc.
  const isProtectedPage = url.pathname.startsWith("/admin");

  // 2. Intentamos obtener la cookie que guardará el JWT de tu Python.
  const token = cookies.get("auth_token");

  // 3. Lógica de protección:
  // Si el usuario quiere ir a una página protegida pero NO tiene el token...
  if (isProtectedPage && !token) {
    // Lo mandamos al login
    return redirect("/login");
  }

  // Si tiene token o la página no es protegida, lo dejamos pasar.
  return next();
});