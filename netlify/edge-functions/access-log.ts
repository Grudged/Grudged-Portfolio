import type { Context } from "https://edge.netlify.com/";

const SKIP_EXT = /\.(js|mjs|css|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf|eot|json|xml|txt|webmanifest)$/i;

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (SKIP_EXT.test(url.pathname)) return;
  if (url.pathname.startsWith("/.netlify/")) return;

  const ua = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "";

  console.log(JSON.stringify({
    ts: new Date().toISOString(),
    path: url.pathname + url.search,
    referer,
    ua,
    country: context.geo?.country?.code || "",
    city: context.geo?.city || "",
    ip: context.ip || "",
    method: request.method,
  }));
};

export const config = {
  path: "/*",
};
