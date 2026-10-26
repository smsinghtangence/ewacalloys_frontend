
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import SafetyContentsNav, { } from "@/components/about/SafetyContentsNav";

export const metadata = {
  title: "Safety and Environment | EWAC",
  description:
    "EWAC Alloys' commitment to safety and the environment, its EHS policy statement, quality policy and ISO certification.",
};

const SECTIONS = [
  { id: "commitment-to-safety", label: "Our Commitment to Safety" },
  { id: "commitment-to-environment", label: "Our Commitment to the Environment" },
  { id: "ehs-policy-statement", label: "Environment, Health & Safety (EHS) Policy Statement" },
  { id: "quality-policy", label: "Quality Policy" },
  { id: "iso-certification", label: "ISO Certification" },
];

const GUIDING_PRINCIPLES = [
  "Promote safety and environmental protection as core business values in all operations and company activities.",
  "Commit to resource conservation and pollution prevention for our activities, products and services. Extend a life-cycle philosophy and expectation to our upstream and downstream interested parties.",
  "Focus on the goal of zero workplace injuries, illnesses, and EHS incidents.",
  "Cultivate an EHS culture that fosters engaged, empowered, and action-oriented worker behavior.",
  "Be attentive to the Voice of Customer and act as their valued EHS partner, contributing to our shared success.",
  "Achieve compliance with applicable laws and regulations and other requirements to which we subscribe.",
  "Report, investigate, and analyze all EHS incidents with a focus on preventing reoccurrence.",
  "Educate and train workers to identify, understand, and respect EHS aspects and hazards, and reduce impacts and risks in their work environment.",
  "Continual improvement of EHS Management Systems through assessments, actionable planning and implementation of best practices.",
  "Provide interested parties with useful information about EHS impacts and risks associated with EWAC business activities.",
  "Recognize EHS milestones and celebrate success.",
];

function SectionHeading({ number, children }) {
  return (
    <div className="safety-heading">
      <span className="safety-badge">{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

export default function SafetyAndEnvironmentPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/safety-banner.webp"
        mobileSrc="/assets/images/safety-banner-mobile.webp"
        alt="Safety and Environment"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Safety and Environment" />
        </div>
      </section>

      <section className="safety-section">
        <GearBackdrop className="safety-gear" />
        <div className="container">
          <h1 className="safety-title" data-aos="fade-up">
            Safety and Environment
          </h1>

          <div className="safety-layout">
            <SafetyContentsNav sections={SECTIONS} />

            <div className="safety-main">
              <section id={SECTIONS[0].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="01">Our Commitment to Safety</SectionHeading>
                <div className="safety-body">
                  <p>
                    Health and safety issues are especially critical to the welding process. We envision a world
                    with no work-related injuries to our employees and visitors in our plant &amp; office premises
                    or people using our products. On request we provide MSDS (Material Safety Data Sheet) of our
                    products to our customers.
                  </p>
                </div>
              </section>

              <section id={SECTIONS[1].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="02">Our Commitment to the Environment</SectionHeading>
                <div className="safety-body">
                  <p>
                    Sustainable Development means satisfying human needs without compromising the ability for
                    future generations to meet their needs. As a world leader in our industry, we recognize our
                    responsibility to move our processes and products and our industry towards sustainability.
                  </p>
                  <p>
                    EWAC has established and maintains an Environmental, Health &amp; Safety Policy and
                    Environmental, Health &amp; Safety Vision and sets group objectives for key environmental
                    aspects such as lowering energy and water use and eliminating hazardous substances. Our life
                    cycle approach enables us to balance opportunities with risks and make choices that contribute
                    value to our economies, our natural environments, and our communities. Our Vision enables us to
                    conserve Metallic Resources.
                  </p>
                  <p>A structured management system is key to maintaining continuous improvement.</p>
                </div>
              </section>

              <section id={SECTIONS[2].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="03">Environment, Health &amp; Safety (EHS) Policy Statement</SectionHeading>
                <div className="safety-body">
                  <h3>Mission</h3>
                  <p>
                    Conduct our operations in a manner that conserves natural resources, is protective of the
                    environment, and returns each worker home every day in the same or better condition than when
                    they arrived at work.
                  </p>
                  <h3>Policy</h3>
                  <p>
                    EWAC Alloys Limited, a Pioneer &amp; established market player in maintenance and repair
                    welding technology, is committed to conserve Metallic Resources by providing cost economic
                    solution. EWAC is committed to being a clean, sustainable manufacturer, and providing a safe
                    work environment for all workers. Our EHS Management System fosters a high-performance culture
                    where EHS awareness, involvement, and accountability are intrinsic to all business activities.
                  </p>
                  <h3>Guiding Principles</h3>
                  <ul>
                    {GUIDING_PRINCIPLES.map((principle) => (
                      <li key={principle}>{principle}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id={SECTIONS[3].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="04">Quality Policy</SectionHeading>
                <div className="safety-body">
                  <a
                    className="safety-doc-link"
                    href="/assets/docs/global-quality-policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quality Policy Certificate
                  </a>
                </div>
              </section>

              <section id={SECTIONS[4].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="05">ISO Certification</SectionHeading>
                <div className="safety-body">
                  <a
                    className="safety-doc-link"
                    href="/assets/docs/ewac-iso-certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View ISO Certification
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
