const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

const DEFAULT_TOP_BAR = {
  label: "NEWS",
  message: "WAC at Wire India 2025 — Hall 3, Stall B-42 · Mumbai · Nov 12–14",
  ctaLabel: "Register Now →",
  ctaHref: "#",
};

const DEFAULT_PRODUCTS_DROPDOWN = {
  eyebrow: "What We Make",
  title: "Our Products",
  description:
    "High-performance welding consumables and wear protection solutions for demanding environments.",
  exploreLabel: "Explore All",
  exploreHref: "#",
};

const DEFAULT_SERVICES_DROPDOWN = {
  eyebrow: "What We Do",
  title: "Our Services",
  description: "Comprehensive on-site and in-house solutions across India's critical industrial sectors.",
  exploreLabel: "Explore All",
  exploreHref: "#",
};

const DEFAULT_INDUSTRIES_DROPDOWN = {
  eyebrow: "What We Serve",
  title: "Industries We Serve",
  description: "Decades of expertise across India's most demanding industrial sectors.",
  exploreLabel: "Explore All",
  exploreHref: "#",
};

const DEFAULT_NAV_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "#" },
];

const DEFAULT_HEADER_SETTINGS = {
  topBar: DEFAULT_TOP_BAR,
  productsDropdown: DEFAULT_PRODUCTS_DROPDOWN,
  servicesDropdown: DEFAULT_SERVICES_DROPDOWN,
  industriesDropdown: DEFAULT_INDUSTRIES_DROPDOWN,
  navLinks: DEFAULT_NAV_LINKS,
};

function resolveDropdown(raw, fallback) {
  if (!raw) return fallback;
  return {
    eyebrow: raw.Eyebrow || fallback.eyebrow,
    title: raw.Title || fallback.title,
    description: raw.Description || fallback.description,
    exploreLabel: raw.ExploreLabel || fallback.exploreLabel,
    exploreHref: raw.ExploreHref || fallback.exploreHref,
  };
}

export async function getHeaderSettings() {
  try {
    const response = await fetch(
      `${backendUrl}/api/header-settings?populate=TopBar,ProductsDropdown,ServicesDropdown,IndustriesDropdown,NavLinks`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return DEFAULT_HEADER_SETTINGS;
    }

    const payload = await response.json();
    const data = payload?.data ?? payload;

    const navLinks =
      Array.isArray(data?.NavLinks) && data.NavLinks.length > 0
        ? data.NavLinks.map((link) => ({
            label: link.Label || "",
            href: link.Href || "#",
          }))
        : DEFAULT_NAV_LINKS;

    return {
      topBar: {
        label: data?.TopBar?.Label || DEFAULT_TOP_BAR.label,
        message: data?.TopBar?.Message || DEFAULT_TOP_BAR.message,
        ctaLabel: data?.TopBar?.CtaLabel || DEFAULT_TOP_BAR.ctaLabel,
        ctaHref: data?.TopBar?.CtaHref || DEFAULT_TOP_BAR.ctaHref,
      },
      productsDropdown: resolveDropdown(data?.ProductsDropdown, DEFAULT_PRODUCTS_DROPDOWN),
      servicesDropdown: resolveDropdown(data?.ServicesDropdown, DEFAULT_SERVICES_DROPDOWN),
      industriesDropdown: resolveDropdown(data?.IndustriesDropdown, DEFAULT_INDUSTRIES_DROPDOWN),
      navLinks,
    };
  } catch {
    return DEFAULT_HEADER_SETTINGS;
  }
}
