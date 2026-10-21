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

export type SecuritySettings = {
  contentSecurityPolicy?: string | null;
  permissionsPolicy?: string | null;
  referrerPolicy?: string | null;
  xFrameOptions?: string | null;
  xContentTypeOptions?: string | null;
  strictTransportSecurity?: string | null;
};

export async function getSecuritySettings(): Promise<SecuritySettings> {
  const response = await fetch(`${backendUrl}/api/security-settings`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load security settings from backend (HTTP ${response.status})`);
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
}
