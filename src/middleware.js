export async function onRequest(context, next) {
  const path = context.url.pathname;

  // Public paths — no auth required.
  if (
    path === "/" ||
    path === "/index.html" ||
    path.endsWith("/callback") ||
    path.endsWith("/logout") ||
    path.endsWith("/terms") ||
    path.endsWith("/privacy")
  ) {
    return next();
  }

  const token = await context.session?.get("access_token");
  if (!token) return context.redirect("/");

  context.locals.access_token = token;
  return next();
}
