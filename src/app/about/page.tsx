import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import AboutHistorySlider from "@/components/about/AboutHistorySlider";

export const metadata: Metadata = {
  title: "About Us | EWAC",
  description: "About EWAC Alloys — leader in maintenance and repair welding since 1962.",
};

const PRODUCT_PILLS = [
  { icon: "/assets/images/about-icon1.svg", label: "Specialized Welding Alloys" },
  { icon: "/assets/images/about-icon2.svg", label: "Gas Brazing Products and Fluxes" },
  { icon: "/assets/images/about-icon3.svg", label: "Soldering Alloys" },
  { icon: "/assets/images/about-icon4.svg", label: "Thermal Spray Powders" },
  { icon: "/assets/images/about-icon5.svg", label: "Metal & Flux Cored Continuous Wires" },
  { icon: "/assets/images/about-icon6.svg", label: "Polymer-based Compounds" },
  { icon: "/assets/images/about-icon7.svg", label: "Wear Resistant Liners" },
  { icon: "/assets/images/about-icon8.svg", label: "Ceramic Products" },
  { icon: "/assets/images/about-icon9.svg", label: "Welding Equipment and PPE Kits" },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-page-banner">
        <img
          src="/assets/images/about/about-banner.webp"
          alt="About Us — Leader in Maintenance Repair Welding since 1962"
          className="w-100"
        />
        <a href="/contact-us" className="about-banner-cta">
          Contact Us
        </a>
      </section>

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="About Us" />
        </div>
      </section>

      <section className="about-feature-row">
        <GearBackdrop />
        <div className="container">
          <div className="about-feature-stage is-about">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="about-feature-img" data-aos="fade-right">
                  <img src="/assets/images/about/about-ewac-building.webp" alt="EWAC Alloys Limited facility" />
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="about-feature-heading" data-aos="fade-left">
                  About EWAC <br />
                  Alloys
                </h2>
                <div className="about-feature-underline" data-aos="fade-left" data-aos-delay="100" />
                <div
                  className="about-feature-panel about-feature-panel--blue"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <p>
                    EWAC was started as a joint venture between Larsen &amp; Toubro, India, and Eutectic
                    Castolin Group, Switzerland, in 1962. It became a wholly owned L&amp;T subsidiary in
                    2011 and joined Colfax, USA, in 2018. Today, EWAC is a leading manufacturer of advanced
                    welding solutions, exporting to over 50 countries worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-pills-section">
        <div className="container">
          {/*
            Design (about.php) drives this with a jQuery Slick auto-scrolling
            marquee — main.css only lays the pills out horizontally via Slick's
            injected .slick-track (display:flex). Without that JS, this falls
            back to main.css's own commented-out .about-pills-grid treatment
            (flex-wrap, centered) instead — via inline style since main.css's
            unlayered `.about-pills-slider { overflow: hidden }` would otherwise
            beat any Tailwind override regardless of source order.
          */}
          <div
            className="about-pills-slider"
            style={{ overflow: "visible", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}
          >
            {PRODUCT_PILLS.map((pill) => (
              // main.css's .about-pill has `width: 100%`, sized to fill Slick's
              // fixed-width 220px slide wrapper — pin the same width here directly
              // since there's no slide wrapper without Slick's JS.
              <div className="about-pill" key={pill.label} style={{ width: 220 }}>
                <img src={pill.icon} alt="" />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-mv-section">
        <div className="container px-3 px-lg-4">
          <div className="about-mv-stage">
            <div className="about-mv-col is-mission" data-aos="fade-right">
              <div className="about-mv-img">
                <img src="/assets/images/about/mission-photo.webp" alt="Our Mission" />
              </div>
              <h3>Our Mission</h3>
              <div className="about-mv-underline" />
              <p>
                Our Mission is to exceed our Customers&apos; expectations for{" "}
                <strong>superior quality Products &amp; Services</strong> in Repair &amp; Maintenance, and
                in the process offer a healthy &amp; exciting work environment for our employees.
              </p>
            </div>
            <div className="about-mv-divider" />
            <div className="about-mv-col is-vision" data-aos="fade-left">
              <div className="about-mv-img">
                <img src="/assets/images/about/vision-photo.webp" alt="Our Vision" />
              </div>
              <h3>Our Vision</h3>
              <div className="about-mv-underline" />
              <p>
                Our Vision is to &quot;<strong>Repair rather than Replace</strong>&quot; and thereby
                contribute to promoting a Circular Economy, and Sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-feature-row">
        <div className="container">
          <div className="about-feature-stage is-strengths">
            <div className="about-feature-img" data-aos="fade-right">
              <img src="/assets/images/about/strengths-photo.webp" alt="Our Strengths" />
            </div>
            <h2 className="about-feature-heading" data-aos="fade-left">
              Our Strengths
            </h2>
            <div className="about-feature-underline" data-aos="fade-left" data-aos-delay="100" />
            <div className="about-feature-panel about-feature-panel--red" data-aos="fade-left" data-aos-delay="200">
              <p>
                <strong>EWAC Alloys</strong> Limited offers advanced welding solutions, wear protection
                products, and repair services for industrial maintenance. With over 60 years of expertise,
                we deliver customized solutions that enhance productivity, extend equipment life, and are
                supported by a strong nationwide service network and global presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-feature-row">
        <div className="container">
          <div className="about-feature-stage is-achievements">
            <div className="about-feature-img" data-aos="fade-left">
              <img src="/assets/images/about/achievements-photo.webp" alt="Our Achievement" />
            </div>
            <h2 className="about-feature-heading" data-aos="fade-right">
              Our Achievement
            </h2>
            <div className="about-feature-underline" data-aos="fade-right" data-aos-delay="100" />
            <div
              className="about-feature-panel about-feature-panel--blue"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <p>
                A strong, customer&ndash;focused approach and the constant quest for top-class quality
                have enabled EWAC Alloys Limited to attain and sustain leadership in its major lines of
                business for over six decades. With factories and offices located around the country,
                supplemented by a comprehensive marketing and distribution network, EWAC Alloys Limited
                enjoys its customers&apos; trust in virtually every district of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-history-section">
        <div className="container-fluid px-3 px-lg-4">
          <AboutHistorySlider />
        </div>
      </section>

      <ConsultCta />
    </>
  );
}
