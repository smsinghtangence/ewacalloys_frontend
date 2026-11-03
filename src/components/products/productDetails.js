const IMG = "/assets/images/product-detail";

// Detail pages for individual products. Add another entry to publish another product description page.
export const PRODUCT_DETAILS = [
  {
    slug: "ewac-te-101-ac-dc",
    category: "maintenance-and-repair",
    name: "EWAC TE 101 ac/dc+",
    subtitle: "Tubular Electrode with High Temperature Properties",
    bestSeller: true,
    images: [`${IMG}/te-101-1.webp`, `${IMG}/te-101-2.webp`],
    applicationImage: `${IMG}/te-101-application.webp`,
    wheel: `${IMG}/te-101-wheel.webp`,
    application:
      "High temperature wear resistant coatings on all type of carbon steels and stainless steels. Sinter star crushers, Clinker conveyor chains, Hot slag conveyors, Sand and gravel chutes, Clinker wear parts, Pug mill augers and knives, Cement clinker plates, Feed screws, Grate bars, Sinter drums & tray, Coal burner nozzle, Coke pusher shoes, Exhaust fans, Mixer blades, Furnace chutes, Screw conveyors.",
    features: [
      "High Single layer hardness (65 HRc).",
      "Overlay with hot hardness retention properties.",
      "High Wear factor 90 (ASTM G 65, Type A). Surfacing on inclined surfaces with skilled operator.",
      "Can be deposited on low carbon steels, low alloy steels & Stainless steels.",
    ],
    recommendations: [
      "Clean the surface of rust, oil and scale before welding.",
      "Pre-heat heavy or high carbon sections as advised for the base metal.",
      "Keep the electrode dry; re-bake before use if it has been exposed to moisture.",
    ],
    hardness: ["65 - 70 HRc (2 layer) (on MS);", "58 - 63 HRc (on SS 304)"],
    amperage: [
      { size: "6.30", amps: "80 - 120" },
      { size: "8.00", amps: "140 - 180" },
    ],
    brochure: "#",
  },
];
