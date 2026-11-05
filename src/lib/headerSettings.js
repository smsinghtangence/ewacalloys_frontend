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
    exploreHref: "/products",
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
    exploreHref: "/our_services/turnkey-solution",
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
    exploreHref: "/our_industries/steel",
    source: "industries",
    cardVariant: "icon",
  },
  { type: "link", label: "About", href: "/about-us" },
  { type: "link", label: "Insights", href: "/insights" },
  { type: "link", label: "Careers", href: "/careers" },
];

const DEFAULT_HEADER_SETTINGS = {
  logo: { url: "/assets/images/ewac.png", alt: "EWAC" },
  showSearch: true,
  contact: { label: "Contact", href: "/contact-us" },
  topBar: DEFAULT_TOP_BAR,
  navItems: DEFAULT_NAV_ITEMS,
};

function resolveLink(raw) {
  return {
    label: raw.Label || "",
    href: raw.Href || "#",
    newTab: Boolean(raw.OpenInNewTab),
  };
}

// Where "Explore All" goes when Strapi leaves the link empty.
const EXPLORE_FALLBACK = {
  "product-categories": "/products",
  services: "/our_services/turnkey-solution",
  industries: "/our_industries/steel",
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
      exploreHref: raw.ExploreHref || EXPLORE_FALLBACK[raw.Source] || "#",
      source: raw.Source,
      cardVariant: raw.CardVariant || "icon",
      // Cards picked in Strapi override Source; when empty, the cards are pulled from the Source collection.
      cards: (raw.Cards ?? []).map((card) => ({
        label: card.Label || "",
        href: card.Href || "#",
        image: card.Image?.url || "",
      })),
    };
  }
  if (raw.__component === "nav.simple-dropdown") {
    return {
      type: "simple-dropdown",
      label: raw.Label || "",
      href: raw.Href || "#",
      links: (raw.Links ?? []).map(resolveLink).filter((link) => link.label),
    };
  }
  if (raw.__component === "nav.nav-link") {
    const label = raw.Label || "";
    const fallbackHref = label.trim().toLowerCase() === "careers" ? "/careers" : "#";
    return {
      type: "link",
      label,
      href: raw.Href && raw.Href !== "#" ? raw.Href : fallbackHref,
      newTab: Boolean(raw.OpenInNewTab),
    };
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
      logo: {
        url: data?.Logo?.url || DEFAULT_HEADER_SETTINGS.logo.url,
        alt: data?.LogoAlt || DEFAULT_HEADER_SETTINGS.logo.alt,
      },
      showSearch: data?.ShowSearch ?? DEFAULT_HEADER_SETTINGS.showSearch,
      contact: {
        label: data?.ContactLabel || DEFAULT_HEADER_SETTINGS.contact.label,
        href: data?.ContactHref || DEFAULT_HEADER_SETTINGS.contact.href,
      },
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
