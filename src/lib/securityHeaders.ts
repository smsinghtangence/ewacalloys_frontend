const DEFAULT_HEADERS = {
  contentSecurityPolicy:
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  permissionsPolicy: "camera=(), microphone=(), geolocation=()",
  referrerPolicy: "strict-origin-when-cross-origin",
  xFrameOptions: "DENY",
  xContentTypeOptions: "nosniff",
  strictTransportSecurity: "max-age=31536000; includeSubDomains",
};

export type SecuritySettings = typeof DEFAULT_HEADERS;

export async function getSecuritySettings(): Promise<SecuritySettings> {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  try {
    const response = await fetch(`${backendUrl}/api/security-settings`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return DEFAULT_HEADERS;
    }

    const payload = await response.json();
    return {
      contentSecurityPolicy: payload.contentSecurityPolicy || DEFAULT_HEADERS.contentSecurityPolicy,
      permissionsPolicy: payload.permissionsPolicy || DEFAULT_HEADERS.permissionsPolicy,
      referrerPolicy: payload.referrerPolicy || DEFAULT_HEADERS.referrerPolicy,
      xFrameOptions: payload.xFrameOptions || DEFAULT_HEADERS.xFrameOptions,
      xContentTypeOptions: payload.xContentTypeOptions || DEFAULT_HEADERS.xContentTypeOptions,
      strictTransportSecurity: payload.strictTransportSecurity || DEFAULT_HEADERS.strictTransportSecurity,
    };
  } catch {
    return DEFAULT_HEADERS;
  }
}
