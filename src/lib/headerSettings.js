const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

const DEFAULT_TOP_BAR = {
  label: "NEWS",
  message: "WAC at Wire India 2025 — Hall 3, Stall B-42 · Mumbai · Nov 12–14",
  ctaLabel: "Register Now →",
  ctaHref: "#",
};

const DEFAULT_NAV_ITEMS = [
  {
    type: "dropdown",
    label: "Products",
    eyebrow: "What We Make",
    title: "Our Products",
    description:
      "High-performance welding consumables and wear protection solutions for demanding environments.",
    exploreLabel: "Explore All",
    exploreHref: "#",
    source: "product-categories",
    cardVariant: "icon",
  },
  {
    type: "dropdown",
    label: "Services",
    eyebrow: "What We Do",
    title: "Our Services",
    description: "Comprehensive on-site and in-house solutions across India's critical industrial sectors.",
    exploreLabel: "Explore All",
    exploreHref: "#",
    source: "services",
    cardVariant: "image",
  },
  {
    type: "dropdown",
    label: "Industries",
    eyebrow: "What We Serve",
    title: "Industries We Serve",
    description: "Decades of expertise across India's most demanding industrial sectors.",
    exploreLabel: "Explore All",
    exploreHref: "#",
    source: "industries",
    cardVariant: "icon",
  },
  { type: "link", label: "About", href: "/about-us" },
  { type: "link", label: "Insights", href: "/insights" },
  { type: "link", label: "Careers", href: "#" },
];

const DEFAULT_HEADER_SETTINGS = {
  topBar: DEFAULT_TOP_BAR,
  navItems: DEFAULT_NAV_ITEMS,
};

function resolveNavItem(raw) {
  if (raw.__component === "nav.mega-dropdown") {
    if (!raw.Source) return null;
    return {
      type: "dropdown",
      label: raw.Label || "",
      eyebrow: raw.Eyebrow || "",
      title: raw.Title || "",
      description: raw.Description || "",
      exploreLabel: raw.ExploreLabel || "Explore All",
      exploreHref: raw.ExploreHref || "#",
      source: raw.Source,
      cardVariant: raw.CardVariant || "icon",
    };
  }
  if (raw.__component === "nav.nav-link") {
    return { type: "link", label: raw.Label || "", href: raw.Href || "#" };
  }
  return null;
}

export async function getHeaderSettings() {
  try {
    const response = await fetch(`${backendUrl}/api/header-settings?populate=TopBar,NavItems`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return DEFAULT_HEADER_SETTINGS;
    }

    const payload = await response.json();
    const data = payload?.data ?? payload;

    const navItems = Array.isArray(data?.NavItems)
      ? (data.NavItems.map(resolveNavItem).filter(Boolean))
      : [];

    return {
      topBar: {
        label: data?.TopBar?.Label || DEFAULT_TOP_BAR.label,
        message: data?.TopBar?.Message || DEFAULT_TOP_BAR.message,
        ctaLabel: data?.TopBar?.CtaLabel || DEFAULT_TOP_BAR.ctaLabel,
        ctaHref: data?.TopBar?.CtaHref || DEFAULT_TOP_BAR.ctaHref,
      },
      navItems: navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS,
    };
  } catch {
    return DEFAULT_HEADER_SETTINGS;
  }
}
