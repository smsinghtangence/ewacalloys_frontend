// DUMMY CONTENT — placeholder News and Case Studies until they are managed in Strapi.
// Each post has the same shape the blog pages use, so the listing and detail pages work the same way.
// Replace the text, dates and photos with real ones (or move them to Strapi) before going live.

// sections: [heading, [paragraph, ...]] → the blocks the detail page renders (an <h2> per section).
function toBlocks(intro, sections) {
  const blocks = [{ type: "html", html: intro.map((p) => `<p>${p}</p>`).join("") }];
  for (const [heading, paragraphs] of sections) {
    blocks.push({ type: "h2", html: heading });
    blocks.push({ type: "html", html: paragraphs.map((p) => `<p>${p}</p>`).join("") });
  }
  return blocks;
}

function post({ slug, title, image, date, description, intro, sections }) {
  const words = [...intro, ...sections.flatMap(([, paragraphs]) => paragraphs)].join(" ").split(/\s+/).length;
  return {
    slug,
    title,
    image,
    date,
    description,
    readMinutes: Math.max(1, Math.ceil(words / 200)),
    blocks: toBlocks(intro, sections),
  };
}

export const NEWS_POSTS = [
  post({
    slug: "hvof-coating-advantages-industrial-efficiency",
    title: "Why Choose HVOF Coating? Key Advantages for Industrial Efficiency and Durability",
    image: "/assets/images/news1.webp",
    date: "2026-10-28",
    description:
      "High Velocity Oxy-Fuel (HVOF) coatings give critical components a dense, hard surface that resists wear, corrosion and erosion.",
    intro: [
      "High Velocity Oxy-Fuel (HVOF) spraying has become one of the most trusted ways to protect industrial components from wear, corrosion and erosion.",
      "By propelling powder particles at supersonic speed onto a prepared surface, HVOF produces coatings that are dense, well bonded and extremely hard.",
    ],
    sections: [
      ["Longer component life", [
        "HVOF coatings typically show very low porosity and high bond strength, so components such as pump sleeves, valve balls and fan blades last several times longer between overhauls.",
      ]],
      ["Lower maintenance cost", [
        "Instead of replacing worn parts, plants can recondition them with a coating that often outperforms the original surface, cutting spares inventory and downtime.",
      ]],
      ["Where it is used", [
        "Power plants, refineries, steel mills and cement plants use HVOF on parts exposed to abrasion, high temperature and corrosive media.",
      ]],
    ],
  }),
  post({
    slug: "thermal-spray-powder-work-efficiency",
    title: "Maximizing Work Efficiency with Thermal Spray Powder: A Guide to Its Benefits",
    image: "/assets/images/news2.webp",
    date: "2026-10-14",
    description:
      "Choosing the right thermal spray powder improves coating quality, deposition efficiency and the service life of repaired parts.",
    intro: [
      "Thermal spray powders are engineered to deliver specific surface properties — from wear and heat resistance to corrosion protection.",
    ],
    sections: [
      ["Matching powder to the problem", [
        "Carbide-based powders handle abrasion, nickel and cobalt alloys handle heat and corrosion, and ceramic powders provide thermal barriers.",
      ]],
      ["Better deposition, less waste", [
        "Consistent particle size and chemistry give higher deposition efficiency, so more of the powder ends up on the part and less is lost as overspray.",
      ]],
      ["Getting started", [
        "Our application engineers can review the failure mode of your component and recommend a powder and process that fit your plant.",
      ]],
    ],
  }),
  post({
    slug: "welding-electrodes-industrial-success",
    title: "Why Welding Electrodes Are Essential for Industrial Success: Benefits and Applications",
    image: "/assets/images/news3.webp",
    date: "2026-09-30",
    description:
      "The right welding electrode delivers sound joints, faster repairs and longer equipment life across heavy industry.",
    intro: [
      "Welding electrodes remain the workhorse of maintenance and repair welding in every heavy industry.",
    ],
    sections: [
      ["Reliable joints and overlays", [
        "Purpose-built electrodes produce crack-free joints and hardfacing overlays that stand up to impact, abrasion and heat.",
      ]],
      ["Applications across industries", [
        "From crusher hammers in cement plants to rolls in steel mills and rail crossings, electrodes keep critical equipment running.",
      ]],
    ],
  }),
  post({
    slug: "wear-resistant-solutions-cement-plants",
    title: "Wear-Resistant Solutions Help Cement Plants Extend Equipment Life",
    image: "/assets/images/blogs/blog-wear-plates-mining.webp",
    date: "2026-09-12",
    description:
      "Hardfacing and wear plates reduce unplanned shutdowns on crushers, chutes and separators in cement plants.",
    intro: [
      "Cement plants handle highly abrasive material at every stage, from limestone crushing to clinker handling.",
    ],
    sections: [
      ["Protecting high-wear zones", [
        "Chromium carbide wear plates and hardfacing on chutes, liners and fan blades slow down wear and keep the process running between planned shutdowns.",
      ]],
      ["Repair rather than replace", [
        "Worn parts can often be rebuilt on site, saving the cost and lead time of new spares.",
      ]],
    ],
  }),
  post({
    slug: "stainless-steel-fabrication-guide",
    title: "A Practical Guide to Stainless Steel Fabrication Consumables",
    image: "/assets/images/blogs/blog-ss-fabrication-guide.webp",
    date: "2026-08-26",
    description:
      "How to choose stainless steel electrodes, wires and filler rods for clean, corrosion-resistant welds.",
    intro: [
      "Stainless steel fabrication demands consumables that keep the corrosion resistance of the base metal intact.",
    ],
    sections: [
      ["Choosing the right grade", [
        "Match the filler grade to the base metal and service conditions, and consider low-carbon grades where intergranular corrosion is a risk.",
      ]],
      ["Process tips", [
        "Control heat input, keep the joint clean and use the right shielding gas to avoid discolouration and loss of properties.",
      ]],
    ],
  }),
  post({
    slug: "thermal-spraying-coating-trends",
    title: "Thermal Spraying Trends Shaping Industrial Maintenance",
    image: "/assets/images/blogs/blog-thermal-spray-powder-trends.webp",
    date: "2026-08-08",
    description:
      "New powders, automation and on-site spraying are making thermal spray coatings more accessible to plants.",
    intro: [
      "Thermal spraying is moving from specialist workshops to the plant floor.",
    ],
    sections: [
      ["Automation and consistency", [
        "Robotic spray systems give repeatable coating thickness and quality, even on complex parts.",
      ]],
      ["On-site coating", [
        "Portable equipment lets maintenance teams coat large components in place, cutting dismantling time.",
      ]],
    ],
  }),
];

export const CASE_STUDY_POSTS = [
  post({
    slug: "crusher-hammer-reclamation-cement-plant",
    title: "Crusher Hammer Reclamation Doubles Service Life at a Cement Plant",
    image: "/assets/images/case1.webp",
    date: "2026-10-20",
    description:
      "Hardfacing worn crusher hammers instead of replacing them doubled their service life and cut spares cost.",
    intro: [
      "A cement plant was replacing limestone crusher hammers every few weeks because of severe abrasive wear.",
    ],
    sections: [
      ["The challenge", [
        "Frequent hammer changes meant repeated crusher shutdowns, high spares cost and lost production.",
      ]],
      ["The solution", [
        "Worn hammers were rebuilt and hardfaced with an abrasion-resistant overlay suited to high-impact service.",
      ]],
      ["The result", [
        "Reclaimed hammers lasted roughly twice as long as new ones, and the plant reduced its hammer spares inventory.",
      ]],
    ],
  }),
  post({
    slug: "fan-blade-coating-power-plant",
    title: "Coating ID Fan Blades to Fight Fly-Ash Erosion in a Power Plant",
    image: "/assets/images/case2.webp",
    date: "2026-10-02",
    description:
      "A thermal spray coating on induced draft fan blades reduced erosion and extended the overhaul interval.",
    intro: [
      "Fly ash in the flue gas was eroding the induced draft (ID) fan blades of a thermal power unit.",
    ],
    sections: [
      ["The challenge", [
        "Eroded blades caused vibration and forced unplanned outages for balancing and repair.",
      ]],
      ["The solution", [
        "Blades were coated with a hard, erosion-resistant thermal spray layer on the leading edges and high-wear zones.",
      ]],
      ["The result", [
        "Erosion slowed significantly and the fan ran through to the next planned overhaul.",
      ]],
    ],
  }),
  post({
    slug: "sugar-mill-roller-hardfacing",
    title: "Hardfacing Sugar Mill Rollers for Better Grip and Longer Life",
    image: "/assets/images/case3.webp",
    date: "2026-09-15",
    description:
      "In-situ arcing of sugar mill rollers improved cane grip and reduced roller wear through the crushing season.",
    intro: [
      "A sugar mill was losing extraction efficiency as its roller grooves wore smooth during the season.",
    ],
    sections: [
      ["The challenge", [
        "Worn rollers lost grip on the cane, lowering extraction and increasing power consumption.",
      ]],
      ["The solution", [
        "Rollers were hardfaced in situ with an electrode designed for roughening and wear resistance.",
      ]],
      ["The result", [
        "Grip and extraction stayed consistent through the season with fewer stoppages for maintenance.",
      ]],
    ],
  }),
  post({
    slug: "chute-liner-wear-plates-steel-plant",
    title: "Chromium Carbide Wear Plates Cut Chute Downtime at a Steel Plant",
    image: "/assets/images/blogs/blog-wear-plates-mining.webp",
    date: "2026-08-29",
    description:
      "Replacing mild steel chute liners with chromium carbide wear plates reduced liner changes in a sinter plant.",
    intro: [
      "Transfer chutes in a sinter plant needed frequent liner replacement because of sliding abrasion.",
    ],
    sections: [
      ["The challenge", [
        "Mild steel liners wore through quickly, causing spillage and frequent shutdowns.",
      ]],
      ["The solution", [
        "Chromium carbide overlay wear plates were installed in the high-wear zones of the chutes.",
      ]],
      ["The result", [
        "Liner life increased several times over and maintenance moved to planned shutdowns only.",
      ]],
    ],
  }),
  post({
    slug: "pump-sleeve-hvof-refinery",
    title: "HVOF-Coated Pump Sleeves Resist Corrosion in a Refinery",
    image: "/assets/images/blogs/blog-hvof-coating-petrochemical.webp",
    date: "2026-08-11",
    description:
      "An HVOF carbide coating protected pump shaft sleeves from combined wear and corrosion.",
    intro: [
      "Pump shaft sleeves at a refinery were failing early because of wear and corrosive process fluid.",
    ],
    sections: [
      ["The challenge", [
        "Frequent sleeve replacement increased spares cost and pump downtime.",
      ]],
      ["The solution", [
        "Sleeves were coated with a dense HVOF carbide coating and ground to final size.",
      ]],
      ["The result", [
        "Coated sleeves showed much lower wear and stayed in service longer between overhauls.",
      ]],
    ],
  }),
  post({
    slug: "rail-crossing-reconditioning",
    title: "On-Track Reconditioning of Rail Crossings",
    image: "/assets/images/blogs/blog-welding-products-construction.webp",
    date: "2026-07-24",
    description:
      "Welding repair of worn crossings on track avoided replacement and kept the line in service.",
    intro: [
      "Worn points and crossings normally need replacement, which means long track blocks.",
    ],
    sections: [
      ["The challenge", [
        "Replacing crossings required long traffic blocks and costly new components.",
      ]],
      ["The solution", [
        "Trained welders rebuilt the worn areas on track with approved welding consumables.",
      ]],
      ["The result", [
        "Crossings were returned to service quickly, avoiding replacement and long line closures.",
      ]],
    ],
  }),
];

// Card data for listings and sliders.
export const toPostCard = (basePath) => (item) => ({ image: item.image, title: item.title, href: `${basePath}/${item.slug}` });
export const NEWS_POST_CARDS = NEWS_POSTS.map(toPostCard("/news"));
export const CASE_STUDY_POST_CARDS = CASE_STUDY_POSTS.map(toPostCard("/case-studies"));
