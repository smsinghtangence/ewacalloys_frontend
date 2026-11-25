// Content of the EWAC Care Kit page (/products/maintenance-and-repair-products/ewac-care-kit).
// Text, photos and video are from the Care Kit page on the current ewacalloys.com site.
const IMG = "/assets/images/products-page/care-kit";

export const CARE_KIT = {
  slug: "ewac-care-kit",
  category: "maintenance-and-repair-products",
  categoryLabel: "Maintenance & Repair",
  name: "EWAC Care Kit",
  metaDescription:
    "EWAC Care Kit: Maintenance-in-a-Box with six types of M&R welding electrodes, cold repair compounds and PPE accessories in a robust, reusable kit box.",
  banner: `${IMG}/care-kit-video.webp`,
  intro: [
    "EWAC Alloys Limited, India's leader in Maintenance & Repair, is pioneering the concept of Maintenance-in-a-Box: The EWAC Care Kit.",
    "EWAC Care Kit is a comprehensive pack of Welding Electrodes, Cold Repair Compounds and PPE Accessories.",
  ],
  heroImage: { src: `${IMG}/care-kit-flatlay.webp`, alt: "EWAC Care Kit with electrodes, cold repair compounds and PPE accessories" },
  contents: [
    "Six types of M&R electrodes for cost maintenance requirements",
    "Cold Repair Compounds for ambient temperature joining",
    "High-Quality PPE Accessories",
    "Easy to carry, Robust, Reusable Kit box",
  ],
  video: {
    url: "https://www.youtube.com/watch?v=fnzhVanAzjs",
    thumbnail: `${IMG}/care-kit-video.webp`,
  },
  tagline: "It is India's First and Only Emergency Kit for Industrial Maintenance, a must for every manufacturing company.",
  featured: {
    src: `${IMG}/electrode-pack.webp`,
    alt: "Pack of EWAC maintenance and repair electrodes",
    name: "EWAC Maintenance & Repair Electrodes",
  },
  items: [
    { src: `${IMG}/cold-repair-compound.webp`, alt: "Polypaste Quik-X cold repair compound", name: "Polypaste Quik-X" },
    { src: `${IMG}/arm-sleeves.webp`, alt: "Leather arm sleeves", name: "Leather Arm Sleeves" },
    { src: `${IMG}/apron.webp`, alt: "Leather welding apron", name: "Leather Welding Apron" },
    { src: `${IMG}/gloves.webp`, alt: "Leather welding gloves", name: "Leather Welding Gloves" },
    { src: `${IMG}/lined-sleeves.webp`, alt: "Lined leather sleeves", name: "Lined Leather Sleeves" },
    { src: `${IMG}/kit-open.webp`, alt: "Open Care Kit box with electrodes", name: "Open EWAC Care Kit" },
    { src: `${IMG}/kit-box.webp`, alt: "EWAC Care Kit with its carton", name: "EWAC Care Kit Packaging" },
    { src: `${IMG}/kit-contents.webp`, alt: "Care Kit box with all its contents", name: "Care Kit Contents" },
    { src: `${IMG}/kit-case.webp`, alt: "Closed EWAC Care Kit case", name: "Reusable Care Kit Case" },
  ],
};

// Pages with their own layout instead of the standard product page.
export const CUSTOM_PRODUCT_PAGES = { [CARE_KIT.slug]: CARE_KIT };

// Cards for those pages, listed before the Strapi products (same shape as getProducts() in src/lib/catalog.js).
export const CUSTOM_PRODUCT_CARDS = [
  {
    id: CARE_KIT.slug,
    name: CARE_KIT.name,
    slug: CARE_KIT.slug,
    category: CARE_KIT.category,
    categoryName: "Maintenance & Repair products",
    subCategory: "",
    productCategory: "",
    type: "Maintenance Kit",
    process: "Manual Metal Arc",
    brand: "EWAC",
    description: "Maintenance-in-a-Box: six types of M&R electrodes, cold repair compounds and PPE accessories in one reusable kit.",
    image: CARE_KIT.heroImage.src,
    bestSeller: false,
  },
];
