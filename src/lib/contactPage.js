import { getProductCategories } from "@/lib/catalog";

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
const LEGACY_PRODUCT_INTERESTS = new Set([
  "maintenance & repair products",
  "fabrication products",
  "wear liners & components",
  "ceramic liners & components",
  "equipment",
]);

// What the page showed before it moved to Strapi; used when Strapi is down or a field is left empty.
const DEFAULT_CONTACT_PAGE = {
  banner: "/assets/images/blogs/contact-us-banner.webp",
  mobileBanner: "/assets/images/blogs/contact-us-banner-mobile.webp",
  bannerAlt: "Contact Us",
  formTitle: "Let's Talk!",
  formSubtitle: "Get in touch with us using the enquiry form or contact details below.",
  countries: [
    "India",
    "South America",
    "Europe",
    "Africa",
    "Middle East",
    "South East Asia",
    "China",
    "Japan",
    "South Korea",
    "Sri Lanka",
    "Bangladesh",
  ],
  interests: [
    "Maintenance & Repair products",
    "Fabrication",
    "Wear Liners & Components",
    "Ceramic Liners & Components",
    "Welding Equipment",
    "Turnkey Solutions",
    "Railways",
    "EWAC Reclamation Facility (ERF)",
  ],
  map: "/assets/images/blogs/contact-map.webp",
  mapAlt: "EWAC Alloys Limited location map",
  officesTitle: "Our Offices",
  offices: [
    {
      label: "Head Office",
      name: "EWAC Alloys Limited,",
      address:
        "6th floor, AWFIS, Vaman Techno Center, Makwana Road, Marol, Andheri East, Mumbai – 400059. Maharashtra, India.",
      phones: ["+91 89255 22309", "+91 8433603454"],
      email: "enquiry@ewacalloys.com",
    },
  ],
  meta: {},
};

function labels(options) {
  return (options ?? []).map((option) => option.Label).filter(Boolean);
}

function resolveOffice(office) {
  return {
    label: office.Label || "",
    name: office.Name || "",
    address: office.Address || "",
    // Editors enter one phone number per line.
    phones: (office.Phones || "").split(/\r?\n/).map((phone) => phone.trim()).filter(Boolean),
    email: office.Email || "",
  };
}

export async function getContactPage() {
  try {
    const response = await fetch(`${backendUrl}/api/contact-page`, { next: { revalidate: 60 } });
    if (!response.ok) return DEFAULT_CONTACT_PAGE;

    const data = (await response.json())?.data;
    if (!data) return DEFAULT_CONTACT_PAGE;

    const countries = labels(data.CountryOptions);
    const categoryList = await getProductCategories();
    const productInterests = categoryList.length > 0
      ? categoryList.map((category) => category.name)
      : DEFAULT_CONTACT_PAGE.interests.slice(0, 5);
    const otherInterests = labels(data.InterestedInOptions).filter(
      (label) => !LEGACY_PRODUCT_INTERESTS.has(label.trim().toLowerCase())
    );
    const interests = [...productInterests, ...otherInterests];
    const offices = (data.Offices ?? []).map(resolveOffice).filter((office) => office.label);

    return {
      banner: data.Banner?.url || DEFAULT_CONTACT_PAGE.banner,
      mobileBanner: data.MobileBanner?.url || data.Banner?.url || DEFAULT_CONTACT_PAGE.mobileBanner,
      bannerAlt: data.BannerAlt || DEFAULT_CONTACT_PAGE.bannerAlt,
      formTitle: data.FormTitle || DEFAULT_CONTACT_PAGE.formTitle,
      formSubtitle: data.FormSubtitle || DEFAULT_CONTACT_PAGE.formSubtitle,
      countries: countries.length > 0 ? countries : DEFAULT_CONTACT_PAGE.countries,
      interests,
      map: data.MapImage?.url || DEFAULT_CONTACT_PAGE.map,
      mapAlt: data.MapAlt || DEFAULT_CONTACT_PAGE.mapAlt,
      officesTitle: data.OfficesTitle || DEFAULT_CONTACT_PAGE.officesTitle,
      offices: offices.length > 0 ? offices : DEFAULT_CONTACT_PAGE.offices,
      meta: data.MetaSection?.[0] ?? {},
    };
  } catch {
    return DEFAULT_CONTACT_PAGE;
  }
}
