import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import ErfTabs from "@/components/services/ErfTabs";
import ErfStats from "@/components/services/ErfStats";
import ErfGallery from "@/components/services/ErfGallery";

export const metadata = {
  title: "EWAC Reclamation Facility (ERF) | EWAC",
  description:
    "EWAC Reclamation Facility (ERF) specializes in critical turnkey reclamation jobs involving weld surfacing, machining, pre & post weld heat treatment with the latest technologies and up-to-date surfacing materials.",
};

const IMG = "/assets/images/erf";

const TABS = [
  {
    id: "approach",
    label: "Our Approach",
    image: `${IMG}/approach.png`,
    items: [
      "Analysis of wear factors/ Failure Analysis.",
      "Simulation of welding process and metallography of weld deposits and interface.",
      "Formulation of welding procedure including pre, post-weld heat treatment.",
      "Formulation of QAP covering all stages of the reclamation process.",
      "Analyzing the need for fixturing and developing the same.",
      "Close in-process monitoring.",
    ],
  },
  {
    id: "capabilities",
    label: "Capabilities",
    image: `${IMG}/capabilities.jpg`,
    items: [
      "More than 6 decades of experience in maintenance and repair welding.",
      "State-of-the-art infrastructure for wear protection & welding jobs.",
      "Skilled manpower.",
      "Experienced R&D support for innovation & improvements in providing customized solutions.",
    ],
  },
  {
    id: "services",
    label: "Services offered",
    image: `${IMG}/services.jpg`,
    items: ["Metal Joining", "Wear Protection", "Weld Repairs/Reclamation", "Thermal Spray", "Anti-corrosion coatings"],
  },
];

const STATS = [
  { icon: `${IMG}/ic-1.svg`, target: 10000, label: "Jobs executed" },
  {
    icon: `${IMG}/ic-2.svg`,
    target: 400,
    label:
      "Customers across major core sector industries spread in the large area provides ample space to undertake a wide range of applications.",
  },
];

// An item is either text, or { text, items } for an item with a sub-list.
const FACILITIES = [
  {
    title: "Facilities",
    items: [
      "Multiple Workstations for bulk – welding and steel mill roll cladding",
      "Welding positioner for VRM Table Liners and other critical Jobs (4mtr dia X 20 tons capacity)",
      "Lathes up to (9mtr between centre & 1mtr centre height)",
      {
        text: "Host of welding equipment –",
        items: [
          "Submerged arc welding machines",
          "Flux-cored arc welding machines",
          "Pulse MIG / TIG machines",
          "SMAW – inverter-based power sources",
        ],
      },
      "EWAC Zupercoat arc spray set-up for wire dia 1.6mm to 4.74mm for onsite coating of Boiler tubes, Zinc, Aluminium, stainless steel Inconel coatings",
      "Mobile compressors with air dryers both engine driven and electric motor driven",
      "Grit blasting cabinet",
      "Mobile grit blasting equipment",
      "Tank rotators up to 80-ton capacity",
      "Acoustic chamber for thermal spray as well as gouging",
      { text: "Thermal spray –", items: ["Fully automated HP HVOF system with Robot", "Plasma transfer arc"] },
    ],
  },
  {
    title: "Bulk Deposition Jobs",
    items: [
      "Over 300 tons of weld Deposition experience",
      "Cement plant VRM Table liners, roller liners, tires, roller press rolls",
      "Steel plant rolls",
      "Coal mill rolls",
    ],
  },
  {
    title: "EWAC Zuper Arc spray jobs (Onsite/ Workshop)",
    items: ["Shafts", "Boiler Tube coating", "Industrial chimney", "Structure Aluminizing", "Zinc Coating"],
  },
  {
    title: "Flame spray",
    items: ["Ceramic coating, Spray fuse (Microflow) jobs", "Carbides", "Metal alloy powder"],
  },
  {
    title: "Breakdown jobs (Onsite / Workshop)",
    items: ["Forging dies", "Kiln tire", "Girth Gear", "Mill shell", "Hub", "Trunnion etc."],
  },
  {
    title: "EWAC Teroglass anti-corrosion, efficiency increase coatings (Onsite / Workshop)",
    items: ["Pumps", "Valves", "Condenser water boxes"],
  },
  {
    title: "Wear Protection Job",
    items: ["Grizzly bars", "Horns", "Hammers", "Crushers", "Roller press rolls", "TRPF Rolls etc."],
  },
  {
    title: "Related activities",
    items: [
      "Dimensional Inspection by calibrated instruments",
      "NDT-UT, MPT, DPT, X-Ray",
      "Cylindrical Grinding",
      "Vertical turret lathe",
      "Horizontal Boring",
      "Long shaft machining",
      "Stress Relieving",
      "Dynamic Balancing",
    ],
  },
];

const GALLERY = [10, 9, 8, 6, 7, 2, 1, 4, 3, 5, 11].map((n) => `${IMG}/gallery-${n}.jpg`);

export default function ErfPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/turnkey/services-banner.webp"
        mobileSrc="/assets/images/turnkey/services-banner-mobile.webp"
        alt="Services"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb
            current="EWAC Reclamation Facility (ERF)"
            trail={[{ label: "Our Services", href: "/our_services/turnkey-solution" }]}
          />
        </div>
      </section>

      <section className="tk-intro">
        <GearBackdrop className="tk-gear" />
        <div className="container">
          <div className="tk-intro-stage erf-intro-stage">
            <div className="tk-intro-img" data-aos="fade-right">
              <img src="/assets/images/facilities/reclamation-facility.png" alt="EWAC Reclamation Facility" />
            </div>
            <h1 className="tk-heading" data-aos="fade-left">
              EWAC Reclamation <br />
              Facility (ERF)
            </h1>
            <div className="tk-underline" data-aos="fade-left" data-aos-delay="100" />
            <div className="tk-panel tk-panel--blue tk-intro-panel" data-aos="fade-left" data-aos-delay="200">
              <h2 className="erf-panel-title">About ERF</h2>
              <p>
                EWAC Reclamation Facility (ERF) specializes in critical turnkey reclamation jobs involving weld
                surfacing, machining, pre &amp; post weld heat treatment with the latest technologies and up-to-date
                surfacing materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tk-what">
        <div className="container">
          <ErfTabs tabs={TABS} />
        </div>
      </section>

      <section className="tk-industries rw-record">
        <div className="container">
          <h2 className="tk-title rw-record-title">Expertise through experience</h2>
          <ErfStats stats={STATS} />
        </div>
      </section>

      <section className="erf-facilities">
        <div className="container">
          <h2 className="tk-title">Facilities &amp; jobs</h2>
          <div className="erf-fac-grid">
            {FACILITIES.map((group, i) => (
              <div
                className={`erf-fac-card${i === 0 ? " erf-fac-card--wide" : ""}`}
                key={group.title}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
              >
                <h3>{group.title}</h3>
                <div className="tk-underline" />
                <ul>
                  {group.items.map((item) =>
                    typeof item === "string" ? (
                      <li key={item}>{item}</li>
                    ) : (
                      <li key={item.text}>
                        {item.text}
                        <ul>
                          {item.items.map((sub) => (
                            <li key={sub}>{sub}</li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tk-what erf-gallery">
        <div className="container">
          <h2 className="tk-title">Gallery</h2>
          <ErfGallery images={GALLERY} />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
