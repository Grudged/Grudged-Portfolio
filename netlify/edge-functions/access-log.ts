import type { Context } from "https://edge.netlify.com/";

// Static assets we don't care to log.
const SKIP_EXT = /\.(js|mjs|css|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf|eot|json|xml|txt|webmanifest)$/i;

// Probe paths used by credential/CMS-vuln scanners. Returning 410 Gone here
// (a) tells bots to stop asking, (b) prevents the SPA catch-all from serving
// index.html for these paths, which was firing Umami pageviews for bot junk.
const PROBE_PATTERNS: RegExp[] = [
  /^\/\.env(\..*)?$/i,                                                   // /.env, /.env.production
  /^\/[\w.-]+\/\.env(\..*)?$/i,                                          // /backend/.env, /api/.env, /app/.env
  /^\/env\.(local|production|development|staging|prod|dev)\.?$/i,        // /env.production., /env.local.
  /^\/wp-(admin|login|content|includes|json|config\.php)/i,              // WordPress probes
  /^\/xmlrpc\.php/i,
  /^\/(install|setup|setup-config|wp-config|configuration)\.php/i,
  /^\/administrator\//i,
  /^\/(phpmyadmin|pma|phpMyAdmin|mysql)/i,
  /^\/(firebase-service-account|google-service-account|service-account|serviceAccountKey|credentials|secrets)\.json/i,
  /^\/\.aws\//i,
  /^\/\.git\//i,
  /^\/\.svn\//i,
  /^\/\.ssh\//i,
  /^\/\.htaccess/i,
  /^\/(backup|backups|dump|database|db)\.(sql|zip|tar|gz|bak)/i,
  /^\/(api|app|backend|config)\/\.env/i,                                 // belt-and-suspenders
];

function isProbe(path: string): boolean {
  return PROBE_PATTERNS.some((re) => re.test(path));
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Probe check runs BEFORE the static-asset skip — several probe paths end
  // in .json (service-account.json, credentials.json, etc) and would otherwise
  // sneak through to the SPA catch-all.
  const ua = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "";

  if (isProbe(url.pathname)) {
    console.log(JSON.stringify({
      ts: new Date().toISOString(),
      path: url.pathname + url.search,
      referer,
      ua,
      country: context.geo?.country?.code || "",
      city: context.geo?.city || "",
      ip: context.ip || "",
      method: request.method,
      probe: true,
      blocked: 410,
    }));
    return new Response("Gone", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=86400",
      },
    });
  }

  // Static assets we don't care to log (must come after probe check).
  if (SKIP_EXT.test(url.pathname)) return;
  if (url.pathname.startsWith("/.netlify/")) return;

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
