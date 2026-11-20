const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export function resolveImage(media, alt) {
  if (!media?.url) {
    return { url: "", alt };
  }
  // Local uploads are relative (/uploads/...) and proxied by the rewrite in
  // next.config.ts; absolute URLs (e.g. a cloud upload provider) pass through.
  return { url: media.url, alt };
}

export async function fetchStrapi(path) {
  try {
    const response = await fetch(`${STRAPI_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch {
    return [];
  }
}

export async function getProductCategories() {
  const data = (await fetchStrapi(
    "/api/product-categories"
  ));

  return data.map((category) => ({
    id: category.id,
    name: category.Name,
    slug: category.slug,
    image: resolveImage(category.Image, category.Name),
    products: (category.products || []).map((product) => ({
      id: product.id,
      name: product.Name,
      slug: product.slug,
      image: resolveImage(product.Image, product.Name),
    })),
  }));
}

// Strapi slugs whose page lives at a different URL. Any other slug uses /our_services/<slug>.
const SERVICE_PAGES = {
  "turnkey-solutions": "/our_services/turnkey-solution",
  "erf-services": "/our_services/ewac-reclamation-facility-erf",
};

export async function getServices() {
  const data = (await fetchStrapi(
    "/api/services?populate=Image&sort=order"
  ));

  return data.map((service) => ({
    id: service.id,
    name: service.Name,
    slug: service.slug,
    href: SERVICE_PAGES[service.slug] ?? `/our_services/${service.slug}`,
    image: resolveImage(service.Image, service.Name),
    description: service.Description || "",
  }));
}

// Strapi industries without their own /our_industries page. Any other slug uses /our_industries/<slug>.
const INDUSTRY_PAGES = {
  railways: "/our_services/railways",
};

export async function getIndustries() {
  const data = (await fetchStrapi(
    "/api/industries?populate=Image&sort=order"
  ));

  return data.map((industry) => ({
    id: industry.id,
    name: industry.Name,
    slug: industry.slug,
    href: INDUSTRY_PAGES[industry.slug] ?? `/our_industries/${industry.slug}`,
    image: resolveImage(industry.Image, industry.Name),
  }));
}

// Footer links that are still "#" in Strapi but already have a page on this site.
// A real Href set in Strapi always wins. Keys are the link label in lower case.
const FOOTER_HREF_FALLBACKS = {
  // Products (no separate Process/Technology/Metal/Brand pages yet, so all go to the product listing)
  "by category": "/products",
  "by process": "/products",
  "by technology": "/products",
  "by metal type": "/products",
  "by brand": "/products",
  // Services
  "turnkey solutions": "/our_services/turnkey-solution",
  railways: "/our_services/railways",
  erf: "/our_services/ewac-reclamation-facility-erf",
  // Company
  "about us": "/about-us",
  "r&d centre": "/about-us/ewac-rd-centre",
  "ewac institute": "/about-us/trainings",
  careers: "/careers",
  "our clients": "/#clients",
  // Legal
  "contact us": "/contact-us",
  "privacy policy": "/privacy-policy",
  "terms & conditions": "/terms-conditions",
  testimonials: "/life-at-ewac#testimonials",
};

export async function getFooterColumns() {
  const data = (await fetchStrapi(
    "/api/footer-columns?populate=links&sort=order"
  ));

  return data.map((column) => ({
    id: column.id,
    heading: column.Heading,
    links: (column.links || []).map((link) => ({
      label: link.Label,
      href: link.Href && link.Href !== "#" ? link.Href : FOOTER_HREF_FALLBACKS[link.Label.trim().toLowerCase()] ?? "#",
    })),
  }));
}
