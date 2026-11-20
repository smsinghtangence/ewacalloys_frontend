const IMAGES = [
  "/assets/images/products1.webp",
  "/assets/images/products2.webp",
  "/assets/images/products3.webp",
  "/assets/images/products4.webp",
];

const GOUGE = "An excellent electrode for gouging and beveling and removable of weld defects for ferrous or non-ferrous metal";
const PIERCE = "Special electrode for all position cutting and piercing of all metals";
const WELD = "All position electrode for welding of low carbon thin sheets, forms and plates";

const SEEDS = [
  { name: "EWAC Gougetro", description: GOUGE, type: "Gouging Electrodes", process: "Manual Metal Arc", brand: "EWAC", category: "maintenance-and-repair", bestSeller: true },
  { name: "EWAC Piercetro", description: PIERCE, type: "Gouging Electrodes", process: "Manual Metal Arc", brand: "EWAC", category: "maintenance-and-repair" },
  { name: "Ewacweld", description: WELD, type: "Joining Electrodes", process: "Manual Metal Arc", brand: "EWAC", category: "maintenance-and-repair" },
  { name: "EWAC Gougetro", description: GOUGE, type: "Gouging Electrodes", process: "Manual Metal Arc", brand: "Eutectic", category: "maintenance-and-repair", bestSeller: true },
  { name: "EWAC Piercetro", description: PIERCE, type: "Gouging Electrodes", process: "Manual Metal Arc", brand: "Eutectic", category: "maintenance-and-repair" },
  { name: "Ewacweld", description: WELD, type: "Joining Electrodes", process: "Manual Metal Arc", brand: "Eutectic", category: "maintenance-and-repair" },
  { name: "EWAC Gougetro", description: GOUGE, type: "Joining Electrodes", process: "Manual Metal Arc", brand: "EWAC", category: "maintenance-and-repair", bestSeller: true },
  { name: "EWAC Piercetro", description: PIERCE, type: "Joining Electrodes", process: "Manual Metal Arc", brand: "Castolin", category: "maintenance-and-repair" },
  { name: "Ewacweld", description: WELD, type: "Tubular Electrode", process: "Manual Metal Arc", brand: "EWAC", category: "fabrication-products" },
  { name: "EWAC Gougetro", description: GOUGE, type: "Tubular Electrode", process: "Manual Metal Arc", brand: "Castolin", category: "fabrication-products", bestSeller: true },
  { name: "EWAC Piercetro", description: PIERCE, type: "Wear protection electrodes", process: "Manual Metal Arc", brand: "EWAC", category: "wear-liners-and-components" },
  { name: "Ewacweld", description: WELD, type: "Wear protection electrodes", process: "Manual Metal Arc", brand: "Eutectic", category: "wear-liners-and-components" },
  { name: "EWAC Gougetro", description: GOUGE, type: "Joining Wires", process: "Gas Shielded Arc", brand: "EWAC", category: "fabrication-products", bestSeller: true },
  { name: "EWAC Piercetro", description: PIERCE, type: "Bare brazing alloys", process: "Gas Brazing", brand: "Castolin", category: "ceramic-liners-and-components" },
  { name: "Ewacweld", description: WELD, type: "Soldering alloy", process: "Soldering", brand: "EWAC", category: "equipment" },
  { name: "EWAC Gougetro", description: GOUGE, type: "Thermal spraying", process: "Thermal Spray", brand: "Eutectic", category: "maintenance-and-repair", bestSeller: true },
];

// Real products listed first. Their pages have their own layout (see CUSTOM_PRODUCT_PAGES in careKit.js).
const FEATURED = [
  {
    id: "ewac-care-kit",
    slug: "ewac-care-kit",
    name: "EWAC Care Kit",
    description: "Maintenance-in-a-Box: six types of M&R electrodes, cold repair compounds and PPE accessories in one reusable kit.",
    type: "Maintenance Kit",
    process: "Manual Metal Arc",
    brand: "EWAC",
    category: "maintenance-and-repair",
    image: "/assets/images/products-page/care-kit/care-kit-flatlay.webp",
  },
];

// Placeholder catalogue that mirrors the design until product records exist in Strapi.
// (Numbered slugs stay the same as before: the featured products above are not counted.)
export const PRODUCTS = [
  ...FEATURED,
  ...SEEDS.map((seed, index) => ({
    ...seed,
    id: index + 1,
    slug: `${seed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${index + 1}`,
    image: IMAGES[Math.floor(index / 4) % IMAGES.length],
  })),
];
