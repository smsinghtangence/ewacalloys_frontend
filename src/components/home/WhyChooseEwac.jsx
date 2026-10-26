"use client";

import { useTabs } from "@/components/shared/useTabs";

const TABS = [
  {
    id: "rnd",
    navLabel: (
      <>
        In-House
        <br />
        R&amp;D Centre
      </>
    ),
    dropdownLabel: "In-House R&D Centre",
    image: "/assets/images/R-&-D.webp",
    alt: "In-House R&D Centre",
    caption:
      "EWAC's dedicated Research & Development team continuously develops innovative welding technologies and customized solutions to meet evolving industrial challenges.",
  },
  {
    id: "institute",
    navLabel: (
      <>
        EWAC Institute
        <br />
        Training
      </>
    ),
    dropdownLabel: "EWAC Institute Training",
    image: "/assets/images/training.webp",
    alt: "EWAC Institute Training",
    caption:
      "EWAC offers specialized training programs and technical workshops to enhance welding skills, application knowledge, and industry best practices for the engineers, customers and professionals.",
  },
  {
    id: "turnkey",
    navLabel: (
      <>
        Turnkey
        <br />
        Solutions
      </>
    ),
    dropdownLabel: "Turnkey Solutions",
    image: "/assets/images/turnkey-solutions.webp",
    alt: "Turnkey Solutions",
    caption:
      "EWAC provides end-to-end turnkey maintenance and repair solutions on-site or through our reclamation facility, offer technical support to enhance equipment life and operational efficiency.",
  },
  {
    id: "legacy",
    navLabel: (
      <>
        64+ Years
        <br />
        of Legacy
      </>
    ),
    dropdownLabel: "64+ Years of Legacy",
    image: "/assets/images/legacy.webp",
    alt: "64+ Years of Legacy",
    caption:
      "For over 64 years, EWAC has built a strong legacy of trust, innovation, and technical excellence in maintenance and repair welding products and solutions across diverse industrial sectors.",
  },
  {
    id: "network",
    navLabel: (
      <>
        Pan-India
        <br />
        Network
      </>
    ),
    dropdownLabel: "Pan-India Network",
    image: "/assets/images/pan-india-network.webp",
    alt: "Pan-India Network",
    caption:
      "With a strong nationwide presence, EWAC provides prompt technical support, product availability, and customer service through its extensive application support and distribution network.",
  },
  {
    id: "quality",
    navLabel: (
      <>
        Trusted
        <br />
        Quality
      </>
    ),
    dropdownLabel: "Trusted Quality",
    image: "/assets/images/trusted-quality.webp",
    alt: "Trusted Quality",
    caption: "",
  },
];

export default function WhyChooseEwac() {
  const { activeTab, setActiveTab, onDropdownChange } = useTabs(TABS.map((tab) => tab.id));

  return (
    <section className="why-section">
      <div className="why-gears" aria-hidden="true">
        <img src="/assets/images/about-gear1.svg" className="gear1" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear2" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear3" alt="img" />
      </div>

      <div className="container">
        <h2 className="why-heading">
          Why Choose <img src="/assets/images/logo-m.svg" alt="EWAC" className="why-logo-inline" />
        </h2>
        <p className="why-sub">
          For over 64+ years, EWAC has been a trusted partner to industries operating in the
          wear-intensive and heavy-duty sectors. Customers choose EWAC for our innovative welding
          products and solutions that improve productivity, reduce maintenance costs, and extend
          component life. Backed by strong technical expertise and a customer-focused approach,
          EWAC continues to deliver reliable, high-performance solutions built on Technology,
          Track record, and Trust.
        </p>

        <div className="why-tabs-wrap">
          <div className="why-dropdown-wrap">
            <select className="why-dropdown" id="whyDropdown" value={activeTab} onChange={onDropdownChange}>
              {TABS.map((tab) => (
                <option value={tab.id} key={tab.id}>
                  {tab.dropdownLabel}
                </option>
              ))}
            </select>
            <span className="why-dropdown-arrow">
              <i className="fas fa-chevron-down" />
            </span>
          </div>

          <div className="why-tab-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`why-tab${tab.id === activeTab ? " active" : ""}`}
                data-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.navLabel}
              </button>
            ))}
          </div>

          <div className="why-tab-content">
            {TABS.filter((tab) => tab.id === activeTab).map((tab) => (
              <div className="why-pane active" id={`why-${tab.id}`} key={tab.id}>
                <img src={tab.image} alt={tab.alt} />
                <div className="why-pane-overlay">{tab.caption && <p>{tab.caption}</p>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
