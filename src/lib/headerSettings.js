// Loads the site header from Strapi → Header Setting (GET /api/header-settings).
// Menu items, dropdown text, links and the NEWS bar come from Strapi (except TEMPORARY_DROPDOWN_LINKS below).
// Edit them in Strapi admin → Content Manager → Header Setting. Changes show within 60 seconds.

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

// The server's header API does not send these yet, so the site's own logo, search and Contact button are used
// until Strapi provides Logo / LogoAlt / ShowSearch / ContactLabel / ContactHref.
const SITE_LOGO = { url: "/assets/images/ewac.png", alt: "EWAC" };
const SITE_CONTACT = { label: "Contact", href: "/contact-us" };

const EMPTY_HEADER = {
  logo: SITE_LOGO,
  showSearch: true,
  contact: SITE_CONTACT,
  topBar: null,
  navItems: [],
};

const linkOrHash = (href) => href || "#";
// The href, or "" when Strapi has none or just "#".
const realHref = (href) => (href && href.trim() !== "#" ? href.trim() : "");

// Mega-menu "Explore All" target when Strapi has no ExploreHref: the list page of that Source, if the site has one.
const EXPLORE_ALL_PAGES = {
  "product-categories": "/products",
  industries: "/our_industries",
};

function resolveLink(raw) {
  return { label: raw.Label || "", href: linkOrHash(raw.Href), newTab: Boolean(raw.OpenInNewTab) };
}

// The component's own name, without its category: "nav.simple-dropdown" and "nav-items.simple-dropdown"
// are both "simple-dropdown", so a component created under a different category in Strapi still works.
const componentType = (raw) => String(raw.__component ?? "").split(".").pop();

// The server's header API sends only a menu item's own fields, not components nested inside it, so a
// dropdown's links are typed into a Long text field "LinkList", one link per line:
//     About Us | /about-us
//     Board of Directors | /about-us/company-info
// Add " | new" at the end of a line to open that link in a new tab.
function parseLinkList(text) {
  return String(text ?? "")
    .split(/\r?\n/)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([label]) => label)
    .map(([label, href, newTab]) => ({ label, href: linkOrHash(href), newTab: newTab?.toLowerCase() === "new" }));
}

// TEMPORARY. The server's header API does not send a Simple Dropdown's Links yet (its controller loads
// NavItems one level deep). Until it does, these links fill the dropdown with the same Label in Strapi.
// As soon as Strapi sends Links (or LinkList text) for a dropdown, Strapi's links are used and these are ignored.
// Delete this list once docs/server-update/header-setting.js is on the server.
const TEMPORARY_DROPDOWN_LINKS = {
  about: [
    { label: "About Us", href: "/about-us" },
    { label: "Board of Directors", href: "/about-us/company-info" },
    { label: "Committee", href: "/about-us/committee" },
    { label: "Facilities", href: "/about-us/facilities" },
    { label: "EWAC R&D Centre", href: "/about-us/ewac-rd-centre" },
    { label: "Export", href: "/about-us/export" },
    { label: "Training", href: "/about-us/trainings" },
    { label: "Investor Relations", href: "/investor-relations" },
    { label: "Policies", href: "/policies" },
    { label: "Safety & Environment", href: "/safety-and-environment" },
  ],
  insights: [
    { label: "Blogs", href: "/blogs" },
    { label: "News", href: "/news" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Gallery", href: "/gallery" },
  ],
  careers: [
    { label: "Careers", href: "/careers" },
    { label: "Life at EWAC", href: "/life-at-ewac" },
    { label: "Apply Now", href: "/careers/jobs" },
  ],
};

// Links typed in Strapi (Links component, then LinkList text), otherwise the temporary list for that Label.
function dropdownLinks(raw) {
  const nested = (raw.Links ?? []).map(resolveLink).filter((link) => link.label);
  if (nested.length > 0) return nested;
  const typed = parseLinkList(raw.LinkList);
  if (typed.length > 0) return typed;
  const temporary = TEMPORARY_DROPDOWN_LINKS[String(raw.Label ?? "").trim().toLowerCase()] ?? [];
  return temporary.map((link) => ({ ...link, newTab: false }));
}

// One Strapi menu item (a dynamic-zone component) → what Nav.jsx / MobileMenu.jsx draw.
function resolveNavItem(raw) {
  const type = componentType(raw);
  if (type === "mega-dropdown") {
    if (!raw.Source) return null;
    return {
      type: "dropdown",
      label: raw.Label || "",
      eyebrow: raw.Eyebrow || "",
      title: raw.Title || "",
      description: raw.Description || "",
      exploreLabel: raw.ExploreLabel || "",
      // Empty when there is nowhere to go; the Explore button is then hidden.
      exploreHref: realHref(raw.ExploreHref) || EXPLORE_ALL_PAGES[raw.Source] || "",
      // Which Strapi collection fills the cards: product-categories, services or industries.
      source: raw.Source,
      cardVariant: raw.CardVariant || "icon",
      // Cards picked in Strapi override Source; when empty, the cards come from the Source collection.
      cards: (raw.Cards ?? []).map((card) => ({
        label: card.Label || "",
        href: linkOrHash(card.Href),
        image: card.Image?.url || "",
      })),
    };
  }
  if (type === "simple-dropdown" || type === "dropdown") {
    const links = dropdownLinks(raw);
    // No links → a plain link, so an empty dropdown never opens.
    if (links.length === 0) return { type: "link", label: raw.Label || "", href: linkOrHash(raw.Href), newTab: false };
    return { type: "simple-dropdown", label: raw.Label || "", href: linkOrHash(raw.Href), links };
  }
  if (type === "nav-link") {
    // A Nav Link with Links (Strapi admin → Links → Add an entry) becomes a dropdown; LinkList text works too.
    const nested = (raw.Links ?? []).map(resolveLink).filter((link) => link.label);
    const links = nested.length > 0 ? nested : parseLinkList(raw.LinkList);
    if (links.length > 0) return { type: "simple-dropdown", label: raw.Label || "", href: linkOrHash(raw.Href), links };
    return { type: "link", label: raw.Label || "", href: linkOrHash(raw.Href), newTab: Boolean(raw.OpenInNewTab) };
  }
  return null;
}

export async function getHeaderSettings() {
  try {
    const response = await fetch(`${backendUrl}/api/header-settings?populate=TopBar,NavItems`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return EMPTY_HEADER;

    const payload = await response.json();
    const data = payload?.data ?? payload;
    const topBar = data?.TopBar;

    const navItems = (data?.NavItems ?? []).map(resolveNavItem).filter(Boolean);

    return {
      logo: { url: data?.Logo?.url || SITE_LOGO.url, alt: data?.LogoAlt || SITE_LOGO.alt },
      showSearch: data?.ShowSearch ?? true,
      contact: { label: data?.ContactLabel || SITE_CONTACT.label, href: data?.ContactHref || SITE_CONTACT.href },
      // No message in Strapi → no NEWS bar.
      topBar: topBar?.Message
        ? {
            label: topBar.Label || "",
            message: topBar.Message,
            ctaLabel: topBar.CtaLabel || "",
            ctaHref: linkOrHash(topBar.CtaHref),
          }
        : null,
      navItems,
    };
  } catch {
    return EMPTY_HEADER;
  }
}
