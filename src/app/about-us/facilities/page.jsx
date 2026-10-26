
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import FacilityPlantSlider from "@/components/about/FacilityPlantSlider";
import ConsultCta from "@/components/shared/ConsultCta";

export const metadata = {
  title: "Facilities | EWAC",
  description:
    "EWAC Alloys facilities — the Dr. Rene Wasserman Centre manufacturing plant in Ankleshwar and the EWAC Reclamation Facility in Pune.",
};

const ISO_CERTS = [
  { image: "/assets/images/facilities/certificate1.png", label: "ISO 9001:2015", system: "Quality Management System" },
  { image: "/assets/images/facilities/certificate2.png", label: "ISO 14001:2015", system: "Environment Management System" },
  { image: "/assets/images/facilities/certificate3.png", label: "ISO 45001:2018", system: "Occupational Health and Safety Management System" },
];

const ERF_SERVICES = [
  "Scientific analysis of worn-out component and formulating a suitable turnkey reconditioning process",
  "Weld surfacing/build up/joining, Thermal spray coating, complete reconditioning of equipment, corrosion resistant coatings by EWAC Teroglass, EWAC ZuperCoat metal spray process",
  "Onsite services for weld buildup, repairs of grinding mill rollers, table liners, Kiln tyres, girth gear, forging press columns or any major equipment breakage repairs",
  "Onsite services of Boiler tube coating with erosion corrosion resistant coatings, convertor hood in steel plants",
  "Steel plant rolls reconditioning line caster rolls, pinch rolls, galvanizing plant rolls, as well as supply of new rolls with surface coating/cladding to have prolonged life",
  "Any type/size of shaft bearing area reconditioning onsite as well as at ERF without distortion",
];

export default function FacilitiesPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/facilities/facilities-banner.webp"
        mobileSrc="/assets/images/facilities/facilities-banner-mobile.webp"
        alt="Facilities"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Facilities" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <section className="fac-plant-section">
        <div className="container">
          <div className="fac-plant-stage">
            <FacilityPlantSlider />
            <div className="fac-plant-content" data-aos="fade-left">
              <h2 className="fac-heading">
                Manufacturing{" "}
                <br />
                Plant - Ankleshwar
              </h2>
              <div className="fac-underline" />
              <div className="fac-panel fac-panel--blue">
                <p>
                  The Dr. Rene Wasserman Centre, a state-of-the-art manufacturing facility located at Ankleshwar,
                  Gujarat, India has hi-tech and modern manufacturing processes.
                  <br />
                  The plant is equipped with the latest MBBR (Moving Bed Biofilm Reactor) Technology for (ETP and
                  STP) effluent treatment system.
                </p>
                <p className="fac-certified">The plant is certified by</p>
                <ul className="fac-iso-list">
                  {ISO_CERTS.map((cert) => (
                    <li key={cert.label}>
                      <img className="fac-iso-badge" src={cert.image} alt={`${cert.label} certified company`} />
                      <span>
                        {cert.label}
                        <br />
                        {cert.system}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fac-erf-section">
        <GearBackdrop className="fac-gear-left" />
        <GearBackdrop className="fac-gear-right" />
        <div className="container">
          <div className="fac-erf-stage">
            <div className="fac-erf-img" data-aos="fade-left">
              <img src="/assets/images/facilities/reclamation-facility.png" alt="Reclamation Facility - Pune" />
            </div>
            <div className="fac-erf-content" data-aos="fade-right">
              <h2 className="fac-heading">
                Reclamation Facility -{" "}
                <br />
                Maharashtra (Pune)
              </h2>
              <div className="fac-underline" />
              <p className="fac-erf-intro">
                Our well-equipped EWAC Reclamation Facility (ERF) for Maintenance &amp; Repair Services offers a new
                lease of life to practically any worn out or broken machine component as well as providing
                modification of new components to prolong the service life by overcoming manufacturing design
                constraints Offerings at the EWAC Reclamation Facility (ERF) include:
              </p>
              <div className="fac-panel fac-panel--red">
                <ul>
                  {ERF_SERVICES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
