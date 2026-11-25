import { CUSTOM_PRODUCT_CARDS } from "@/components/products/careKit";

const STRAPI_URL =process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

// Shown wherever a product or product category has no image in Strapi (cards, listing, menu, gallery).
export const PRODUCT_PLACEHOLDER = "/assets/images/product-placeholder.svg";

export function resolveImage(media, alt, fallback = "") {
  if (!media?.url) {
    return { url: fallback, alt };
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

export async function fetchStrapiRequired(path) {
  let response;
  try {
    response = await fetch(`${STRAPI_URL}${path}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    throw new Error(
      `Cannot reach Strapi at ${STRAPI_URL} (is it running?): ${path}`,
      { cause: error }
    );
  }
  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status}): ${path}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload?.data)) {
    throw new Error(`Strapi returned an invalid data response: ${path}`);
  }

  return payload;
}

// Product fields used across the site (listing filters, search, detail page), matching the hierarchy sheet:
//   category / categoryName  main category slug and name (the slug is the /products/<category> URL)
//   subCategory              middle level when there is one, e.g. "Manual Metal Arc Welding"
//   productCategory          the Product Category filter (deepest level), e.g. "Steel"
//   type / process / brand   the Product Type, Process and Brand filters
function mapCategory(category, mainCategory, parents = []) {
  const path = [...parents, category];
  return {
    id: category.documentId ?? category.id ?? category.slug,
    name: category.Name,
    slug: category.slug,
    level: category.Level,
    image: resolveImage(category.Image, category.Name, PRODUCT_PLACEHOLDER),
    products: (category.products || []).map((product) => ({
      id: product.documentId ?? product.id ?? product.slug,
      name: product.Name,
      slug: product.slug,
      category: mainCategory.slug,
      categoryName: mainCategory.Name,
      subCategory: path.length === 3 ? path[1].Name : "",
      productCategory: category.Name,
      type: product.ProductType || "",
      process: product.Process || "",
      brand: product.Brand || "",
      image: resolveImage(product.Image || product.ApplicationImage, product.Name, PRODUCT_PLACEHOLDER),
    })),
    categories: (category.categories || [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((child) => mapCategory(child, mainCategory, path)),
  };
}

function collectCategoryProducts(category) {
  return [
    ...category.products,
    ...category.categories.flatMap(collectCategoryProducts),
  ];
}

export async function getProductCategories() {
  const data = await fetchStrapi("/api/product-categories");

  return data.map((category) => {
    const mapped = mapCategory(category, category);
    return {
      ...mapped,
      directProducts: mapped.products,
      products: collectCategoryProducts(mapped),
    };
  });
}

// Unreachable Strapi (e.g. during a Vercel build without NEXT_PUBLIC_STRAPI_URL) must not fail the build:
// the page is built with only the custom cards and refills from Strapi on the next revalidation (60 s).
export async function getProducts() {
  try {
    return await loadProducts();
  } catch (error) {
    console.error(`getProducts: ${error.message}`);
    return [...CUSTOM_PRODUCT_CARDS];
  }
}

async function loadProducts() {
  const data = [];
  const pageSize = 100;
  let page = 1;
  let pageCount = 1;

  do {
    const payload = await fetchStrapiRequired(
      `/api/products?sort=order:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const pageData = payload.data;
    data.push(...pageData);
    pageCount = payload.meta?.pagination?.pageCount ?? (pageData.length === pageSize ? page + 1 : page);
    page += 1;
    if (pageData.length === 0) break;
  } while (page <= pageCount);

  // Products with their own page layout (e.g. the EWAC Care Kit) are not in Strapi; list them first.
  const fromStrapi = data.map((product) => {
    if (!product.Name || !product.slug || !product.mainCategory?.slug) {
      throw new Error(`Product API returned a product with incomplete catalog data: ${product.documentId || product.id || "unknown"}`);
    }

    return {
      id: product.documentId ?? product.id ?? product.slug,
      name: product.Name,
      slug: product.slug,
      category: product.mainCategory.slug,
      categoryName: product.mainCategory.Name || "",
      subCategory: product.subCategory?.Name || "",
      productCategory: product.category?.Name || "",
      type: product.ProductType || "",
      process: product.Process || "",
      brand: product.Brand || "",
      description: product.Application || "",
      // Most products have only an application photo; use it on the tile when there is no product photo.
      image: resolveImage(product.Image || product.ApplicationImage, product.Name, PRODUCT_PLACEHOLDER).url,
      bestSeller: Boolean(product.BestSeller),
    };
  });
  return [...CUSTOM_PRODUCT_CARDS, ...fromStrapi];
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
  // Products: the listing opens with a "Browse by …" chip row for that dimension (see ProductListing.jsx)
  "by category": "/products?by=category",
  "by process": "/products?by=process",
  "by technology": "/products?by=technology",
  "by metal type": "/products?by=metal",
  "by brand": "/products?by=brand",
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
    links: (column.links || []).map((link) => {
      const fallback = FOOTER_HREF_FALLBACKS[link.Label.trim().toLowerCase()];
      // "By Category / Process / …" are typed as plain "/products" in Strapi; open the matching browse view instead.
      const generic = !link.Href || link.Href === "#" || (link.Href === "/products" && fallback?.startsWith("/products?"));
      return { label: link.Label, href: generic ? fallback ?? "#" : link.Href };
    }),
  }));
}
