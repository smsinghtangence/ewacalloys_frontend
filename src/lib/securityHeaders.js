const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

// Hardcoded fallback headers disabled: security headers now come only from the
// Strapi `security-settings` API, so the backend must be running.
// const DEFAULT_HEADERS = {
//   // img-src includes the Strapi origin: catalog images (products, services,
//   // industries) are served from its Media Library, not bundled locally.
//   contentSecurityPolicy: `default-src 'self'; img-src 'self' data: ${backendUrl}; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`,
//   permissionsPolicy: "camera=(), microphone=(), geolocation=()",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   xFrameOptions: "DENY",
//   xContentTypeOptions: "nosniff",
//   strictTransportSecurity: "max-age=31536000; includeSubDomains",
// };

// If the backend can't be reached, no security headers are sent (there are no
// hardcoded fallbacks) — but the page still renders instead of failing with a 500.
export async function getSecuritySettings() {
  try {
    const response = await fetch(`${backendUrl}/api/security-settings`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`Failed to load security settings from ${backendUrl} (HTTP ${response.status})`);
      return {};
    }

    const payload = await response.json();
    return {
      contentSecurityPolicy: payload.contentSecurityPolicy,
      permissionsPolicy: payload.permissionsPolicy,
      referrerPolicy: payload.referrerPolicy,
      xFrameOptions: payload.xFrameOptions,
      xContentTypeOptions: payload.xContentTypeOptions,
      strictTransportSecurity: payload.strictTransportSecurity,
    };
  } catch (error) {
    console.error(`Failed to load security settings from ${backendUrl}`, error);
    return {};
  }
}
