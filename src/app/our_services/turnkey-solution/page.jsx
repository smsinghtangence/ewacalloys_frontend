import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import TurnkeyIndustries from "@/components/services/TurnkeyIndustries";
import TurnkeyServices from "@/components/services/TurnkeyServices";
import WorkshopLocations from "@/components/services/WorkshopLocations";

export const metadata = {
  title: "Turnkey Solution | EWAC",
  description:
    "EWAC Alloys turnkey maintenance and repair solutions: on-site and workshop services across all process industries, backed by a nationwide service network.",
};

const IMG = "/assets/images/turnkey";

// Plain photos; the caption is shown as text on top of each one. The slider moves by itself once there are
// more cards than fit on screen (3 on desktop). Cards 4-6 reuse the service descriptions from the Facilities page
// with existing site photos - replace the photos and wording as needed.
const SERVICES = [
  { image: `${IMG}/what-1.webp`, title: "Refurbishment of the Mechanical Component in Steel, Cement, Power, Oil & Gas, Construction etc." },
  { image: `${IMG}/what-2.webp`, title: "Thermal Spray and HVOF Coating Services" },
  { image: `${IMG}/what-3.webp`, title: "Product development with Value added services" },
  { image: "/assets/images/facilities/manufacturing-plant-ankleshwar.jpg", title: "Weld surfacing, build-up and complete reconditioning of worn-out equipment" },
  { image: "/assets/images/facilities/reclamation-facility.png", title: "Boiler tube coating and steel plant roll reconditioning" },
  { image: "/assets/images/about/about-ewac-building.webp", title: "On-site repair of mill rollers, kiln tyres, girth gears and shaft bearing areas" },
];

// Plain photos from /public/assets/images/; the industry name is shown as text on top of each one.
const INDUSTRIES = [
  { name: "Cement", image: "/assets/images/cementIndustry.png" },
  { name: "Steel", image: "/assets/images/Steelindustry.png" },
  { name: "Power", image: "/assets/images/Power.png" },
  { name: "Sugar", image: "/assets/images/Sugarindustry.png" },
  { name: "Mining", image: "/assets/images/MiningIndustry.png" },
  { name: "Oil & Gas", image: "/assets/images/oil-gas.png" },
  { name: "Tyre", image: "/assets/images/tyreindustry.png" },
  { name: "Port", image: "/assets/images/Port.png" },
  { name: "Road Transport", image: "/assets/images/RoadTransport.png" },
  { name: "Railways", image: "/assets/images/Railway.png" },
];

// Placeholder addresses and numbers, as in the design. Replace with the real workshops.
// x / y = where the pin points on the map image, in % (from the left / from the top).
const ADDRESS = "123 Maple Street, Apt 4B, Springfield, State/Province Postal Code: 62701, India";
const STATS = [
  { label: "Users", value: "2000" },
  { label: "Modules", value: "15" },
  { label: "Admin", value: "5" },
];
const WORKSHOPS = [
  { state: "Haryana", address: ADDRESS, x: 29.8, y: 29.8, stats: STATS },
  { state: "Uttar Pradesh", address: ADDRESS, x: 42.2, y: 37.9, stats: STATS },
  { state: "Jharkhand", address: ADDRESS, x: 57.8, y: 47.4, stats: STATS },
  { state: "Maharashtra", address: ADDRESS, x: 25.2, y: 64.4, stats: STATS },
  { state: "Tamil Nadu", address: ADDRESS, x: 37.2, y: 89.9, stats: STATS },
];

export default function TurnkeySolutionPage() {
  return (
    <>
      <InnerBanner
        src={`${IMG}/services-banner.webp`}
        mobileSrc={`${IMG}/services-banner-mobile.webp`}
        alt="Services"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Turnkey Solutions" trail={[{ label: "Our Services", href: "/our_services/turnkey-solution" }]} />
        </div>
      </section>

      <section className="tk-intro">
        <GearBackdrop className="tk-gear" />
        <div className="container">
          <div className="tk-intro-stage">
            <div className="tk-intro-img" data-aos="fade-right">
              <img src={`${IMG}/intro.webp`} alt="EWAC engineers reviewing a repair job on the shop floor" />
            </div>
            <h1 className="tk-heading" data-aos="fade-left">
              Turnkey <br />
              Solution
            </h1>
            <div className="tk-underline" data-aos="fade-left" data-aos-delay="100" />
            <div className="tk-panel tk-panel--blue tk-intro-panel" data-aos="fade-left" data-aos-delay="200">
              <p>
                EWAC Alloys Limited, demonstrating expertise and technical competence in welding and allied products
                since 1962, has been ceaselessly serving the Maintenance and Repair needs across industries. A pioneer
                in the Maintenance and Repair field, EWAC&rsquo;s approach has always been to introduce innovative
                technologies and fight the WAR against WEAR. The Services business provides Turnkey Solutions to
                customers, that result in:
              </p>
              <ol>
                <li>Reduced Downtime</li>
                <li>Enhanced Performance</li>
              </ol>
              <p>
                EWAC leverages its technical skills honed over time through its illustrious heritage of over 60 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tk-what">
        <div className="container">
          <h2 className="tk-title">What we do</h2>
          <p className="tk-lead">
            In partnership with our customers and according to their specifications, EWAC provides a comprehensive
            range of services, customised according to their working conditions. EWAC has a dedicated team of workshop
            and on-site Services Professionals that adhere to a stringent quality control policy consistently practiced
            across its network of repair workshops in the country. We have earned the trust and confidence of customers
            in providing immediate on-site interventions and localised services, thereby saving Equipment Downtime,
            Inventory Costs, Minimising Lead times, and maximising customer profitability.
          </p>
          <TurnkeyServices services={SERVICES} />
        </div>
      </section>

      <section className="tk-industries">
        <div className="container">
          <p className="tk-industries-lead">
            EWAC introduced the concept of &ldquo;Total Turn-Key Solutions&rdquo; in the Indian market. Our dedicated,
            pan-India team of highly skilled and experienced engineers offers one-stop repair solutions for Repair
            &amp; Maintenance welding activities across all process industries, including:
          </p>
          <TurnkeyIndustries industries={INDUSTRIES} />
        </div>
      </section>

      <section className="tk-why">
        <div className="container">
          <div className="tk-why-stage">
            <h2 className="tk-heading" data-aos="fade-right">
              Why We Stand Out
            </h2>
            <div className="tk-underline" data-aos="fade-right" data-aos-delay="100" />
            <div className="tk-panel tk-panel--red tk-why-panel" data-aos="fade-right" data-aos-delay="200">
              <p>
                A breakdown results in functional stoppages and monetary losses in any industry. Our Services team
                support with on-site guidance is available 24/7
              </p>
              <p>
                Thanks to our widespread network of Weld-Technicians and Application Engineers stationed at more than
                120 industry-specific locations in India, we have created new benchmarks for &lsquo;Minimum
                Mobilisation Time&rsquo; to attend to any breakdown call of a customer.
              </p>
              <p>
                We believe in the adage &ndash; &lsquo;A minute saved is a penny earned.&rsquo; Over the years, the
                EWAC Services team has demonstrated technical expertise &amp; repeated reliability and earned Customer
                Trust in offering turnkey solutions for jobs such as:
              </p>
              <ul>
                <li>Kiln Tyre Crack for Cement</li>
                <li>Boiler Tube Coating for Power</li>
                <li>On-site spikes crusher touch-up hard facing in Steel manufacturing</li>
              </ul>
            </div>
            <div className="tk-why-img" data-aos="fade-left">
              <img src={`${IMG}/why.webp`} alt="Technician grinding a steel section on site" />
            </div>
          </div>
        </div>
      </section>

      <section className="tk-team">
        <div className="container">
          <div className="tk-team-stage">
            <div className="tk-team-img" data-aos="fade-right">
              <img src={`${IMG}/team.webp`} alt="Technician working on a large component in an EWAC workshop" />
            </div>
            <h2 className="tk-heading" data-aos="fade-left">
              Team details
            </h2>
            <div className="tk-underline" data-aos="fade-left" data-aos-delay="100" />
            <div className="tk-panel tk-panel--blue tk-team-panel" data-aos="fade-left" data-aos-delay="200">
              <p>
                The strategic placement of our Maintenance &amp; Repair workshops along with Contract Business
                Managers, more than 120 Application Specialist lead by territory Managers &amp; Zonal Head at easily
                accessible locations across India has widened our reach. This has further coupled to reduction in lead
                time. Our facilities are equipped with set-ups for bulk deposition with cumulative experience of over
                300 Tons, metallic spray coatings via both TWAS &amp; Eutalloy, specialized machining equipment to carry
                out precision finish. As an appendage we have state-of-art facility-workshops, available across the
                country to serve our customers with minimum response time. We also utilize our ready to move teams along
                with Container carrying tools, tackles &amp; machinery for in-situ solution at customer premises. This
                helps in minimizing mobilization time
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tk-network">
        <div className="container">
          <div className="tk-network-box">
            <h2 className="tk-title">Nationwide service network</h2>
            <p>
              Our state-of-the-art workshop facilities, available across the country, are complemented by ready-to-move
              teams equipped with containerized tools, tackles and machinery. This enables us to deliver in-situ
              solutions at customer premises, minimizing mobilization time and helping customers get back to operations
              faster. From workshop to worksite, EWAC delivers the expertise, equipment and responsiveness needed to
              keep your operations running.
            </p>
          </div>
        </div>
      </section>

      <section className="tk-locations">
        <div className="container">
          <h2 className="tk-title">Workshop locations</h2>
          <WorkshopLocations locations={WORKSHOPS} mapSrc={`${IMG}/india-map.webp`} />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
