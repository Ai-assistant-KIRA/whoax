/**
 * whoax voice token worker (Cloudflare Workers, free plan).
 *
 * Holds the Deepgram API key server-side and hands the browser a 30-second
 * temporary token, which is only good for opening one Voice Agent connection.
 * The real key never reaches the site's JavaScript.
 *
 * Abuse controls:
 *  - Only the origins in ALLOWED_ORIGINS get a token (browser CORS + Origin check).
 *  - Per-IP rate limit via the CALL_LIMITER binding (see wrangler.toml).
 *  - Tokens expire in 30 s; an open call keeps working, a stolen token does not.
 */

const ALLOWED_ORIGINS = new Set([
  "https://whoax.com",
  "https://www.whoax.com",
  "http://localhost:3000",
]);

const corsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const json = (status, body, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(origin ? corsHeaders(origin) : {}),
    },
  });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = ALLOWED_ORIGINS.has(origin);

    if (request.method === "OPTIONS") {
      return allowed ? new Response(null, { status: 204, headers: corsHeaders(origin) }) : new Response(null, { status: 403 });
    }
    if (request.method !== "POST") return json(405, { error: "method_not_allowed" });
    if (!allowed) return json(403, { error: "forbidden" });

    if (env.CALL_LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.CALL_LIMITER.limit({ key: ip });
      if (!success) return json(429, { error: "rate_limited" }, origin);
    }

    if (!env.DEEPGRAM_API_KEY) return json(503, { error: "not_configured" }, origin);

    const grant = await fetch("https://api.deepgram.com/v1/auth/grant", {
      method: "POST",
      headers: {
        Authorization: `Token ${env.DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ttl_seconds: 30 }),
    });
    if (!grant.ok) return json(502, { error: "upstream_error" }, origin);

    const { access_token, expires_in } = await grant.json();
    return json(200, { access_token, expires_in }, origin);
  },
};
