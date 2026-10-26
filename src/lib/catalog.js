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

export async function getServices() {
  const data = (await fetchStrapi(
    "/api/services?populate=Image&sort=order"
  ));

  return data.map((service) => ({
    id: service.id,
    name: service.Name,
    slug: service.slug,
    image: resolveImage(service.Image, service.Name),
    description: service.Description || "",
  }));
}

export async function getIndustries() {
  const data = (await fetchStrapi(
    "/api/industries?populate=Image&sort=order"
  ));

  return data.map((industry) => ({
    id: industry.id,
    name: industry.Name,
    slug: industry.slug,
    image: resolveImage(industry.Image, industry.Name),
  }));
}

// Footer links that are still "#" in Strapi but already have a page on this site.
const FOOTER_HREF_FALLBACKS = {
  "terms & conditions": "/terms-conditions",
  "privacy policy": "/privacy-policy",
  "about us": "/about-us",
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
