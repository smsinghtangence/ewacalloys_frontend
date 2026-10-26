
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import ExportsExplorer from "@/components/about/ExportsExplorer";

export const metadata = {
  title: "Exports | EWAC",
  description:
    "EWAC Alloys exports Eutectic welding, brazing and thermal spray products to over 25 countries across South Asia, South East Asia, East Asia, West Asia and Africa.",
};

const PRODUCTS = [
  "Special Maintenance & Repair Welding Electrodes",
  "Gas Brazing Rods and Fluxes",
  "Thermal Spray Metal Powders/Delivery Systems",
  "Flux-Cored Continuous Wires",
  "Wear Liner Plates/Components",
  "Polymer Compounds",
];

export default function ExportsPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/exports/export-banner.webp"
        mobileSrc="/assets/images/exports/export-banner.webp"
        alt="Exports"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Exports" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <div className="exports-intro-wrap">
        <GearBackdrop className="exports-gear" />
        <section className="exports-intro">
          <div className="exports-intro-row">
            <div className="exports-intro-img" data-aos="fade-right">
              <img src="/assets/images/exports/exportimg.jpg" alt="Container ship carrying EWAC exports" />
            </div>
            <div className="exports-intro-text" data-aos="fade-left">
              <h2>Exports</h2>
              <p>
                EWAC Alloys Limited has been at the forefront of &lsquo;Maintenance and Repair Welding&rsquo; as a
                market leader in India over the last five decades. The company has an extensive foray of Eutectic
                products, meeting the varied demands of industries across India and Overseas. The manufactured
                product range covers the following for different industrial applications-
              </p>
              <ul>
                {PRODUCTS.map((product) => (
                  <li key={product}>
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="exports-history">
        <div className="container">
          <h2 data-aos="fade-up">History of EWAC in Exports</h2>
          <p>
            EWAC started as JV between Eutectic + Castolin, Germany, and L&amp;T in 1962. Post-2010, L&amp;T bought
            back all the stakes of E+C, and then EWAC became a wholly-owned subsidiary of Larsen &amp; Toubro
            Limited ( L&amp;T). Subsequently, in 2017/18, EWAC became part of Colfax, USA.
          </p>
          <p>
            The company has robust R&amp;D, manufacturing facilities, and a strong presence across India. The brand
            created so many success stories (and still) for others to feel inspired by their journey. In 2014, EWAC
            began on its &ldquo;Exports&rdquo; journey. The company exports EWAC products to over 25 countries
            across South America, Europe, Africa, ME, SEA, China, Japan, South Korea, Sri Lanka, and Bangladesh.
            Additionally, the company deals in providing onsite repair jobs and turnkey solutions by deploying the
            team to the clients&apos; manufacturing plants according to the requirement.
          </p>
        </div>
      </section>

      <ExportsExplorer />

      <ConsultCta welderDecoration />
    </>
  );
}
