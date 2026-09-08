const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export type CatalogImage = { url: string; alt: string };

export type CatalogProduct = {
  id: number;
  name: string;
  slug: string;
  image: CatalogImage;
};

export type CatalogProductCategory = {
  id: number;
  name: string;
  slug: string;
  image: CatalogImage;
  products: CatalogProduct[];
};

export type CatalogService = {
  id: number;
  name: string;
  slug: string;
  image: CatalogImage;
  description: string;
};

export type CatalogIndustry = {
  id: number;
  name: string;
  slug: string;
  image: CatalogImage;
};

export type CatalogFooterLink = {
  label: string;
  href: string;
};

export type CatalogFooterColumn = {
  id: number;
  heading: string;
  links: CatalogFooterLink[];
};

type StrapiMedia = { url: string; name?: string } | null | undefined;

function resolveImage(media: StrapiMedia, alt: string): CatalogImage {
  if (!media?.url) {
    return { url: "", alt };
  }
  return { url: `${STRAPI_URL}${media.url}`, alt };
}

async function fetchStrapi(path: string): Promise<unknown[]> {
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

type RawProduct = { id: number; Name: string; slug: string; Image?: StrapiMedia };
type RawProductCategory = RawProduct & { products?: RawProduct[] };
type RawService = RawProduct & { Description?: string };

export async function getProductCategories(): Promise<CatalogProductCategory[]> {
  const data = (await fetchStrapi(
    "/api/product-categories"
  )) as RawProductCategory[];

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

export async function getServices(): Promise<CatalogService[]> {
  const data = (await fetchStrapi(
    "/api/services?populate=Image&sort=order"
  )) as RawService[];

  return data.map((service) => ({
    id: service.id,
    name: service.Name,
    slug: service.slug,
    image: resolveImage(service.Image, service.Name),
    description: service.Description || "",
  }));
}

export async function getIndustries(): Promise<CatalogIndustry[]> {
  const data = (await fetchStrapi(
    "/api/industries?populate=Image&sort=order"
  )) as RawProduct[];

  return data.map((industry) => ({
    id: industry.id,
    name: industry.Name,
    slug: industry.slug,
    image: resolveImage(industry.Image, industry.Name),
  }));
}

type RawFooterLink = { id: number; Label: string; Href?: string };
type RawFooterColumn = { id: number; Heading: string; links?: RawFooterLink[] };

export async function getFooterColumns(): Promise<CatalogFooterColumn[]> {
  const data = (await fetchStrapi(
    "/api/footer-columns?populate=links&sort=order"
  )) as RawFooterColumn[];

  return data.map((column) => ({
    id: column.id,
    heading: column.Heading,
    links: (column.links || []).map((link) => ({
      label: link.Label,
      href: link.Href || "#",
    })),
  }));
}
