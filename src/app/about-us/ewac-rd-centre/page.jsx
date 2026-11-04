import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import RdFacilities from "@/components/about/RdFacilities";
import PhotoGallery from "@/components/shared/PhotoGallery";

export const metadata = {
  title: "EWAC R&D Centre | EWAC",
  description:
    "EWAC R&D Centre, inaugurated in 1980 and recognised by DSIR, Govt. of India since 1982, develops welding, coating, brazing and polymer products and solutions for maintenance and repair.",
};

const IMG = "/assets/images/rd-centre";

const FOCUS_AREAS = [
  "Basic metallurgy",
  "Welding technology",
  "Coating solutions",
  "Brazing & Soldering",
  "Polymer technology",
  "Tribological studies",
  "Failure Analysis",
];

const FACILITIES = [
  {
    id: "wear",
    title: "Wear and Corrosion Studies",
    image: `${IMG}/wear.webp`,
    text: "Exclusive test rigs have been developed to simulate service conditions for ranking product performance both at room temperature and at elevated temperatures. Some of the key equipments include:",
    items: [
      "Adhesive wear Tester from ambient to 800°C",
      "Abrasion Wear Tester from ambient to 600°C",
      "Air Jet Erosion Tester from ambient to 600°C",
      "Falling Weight Impact tester",
      "Slurry Erosion Tester",
    ],
  },
  {
    id: "chemical",
    title: "Chemical Analysis",
    image: `${IMG}/chemical.webp`,
    text: "Fast and accurate chemical analysis is a key factor for product development. This R&D Centre is equipped with modern equipments like Optical Emission Spectrometer, Positive metal identification and C, S, O2 & N2 Analysers.",
  },
  {
    id: "metallography",
    title: "Metallography",
    image: `${IMG}/metallography.webp`,
    text: "The microstructural analysis enables R&D engineers to design products with desired microstructures, understand the failure mechanism and establish structure-property correlation. The latest opto-digital image analysis system with software for image acquisition, analysis and archiving with a large number of available functions sets new standards for scientific image processing.",
  },
  {
    id: "pilot-plants",
    title: "R&D Pilot Plants",
    image: `${IMG}/pilot-plants.webp`,
    text: "EWAC R&D is equipped with pilot plants for coated electrodes, wear plates, steel mill reconditioning trials and polymer compounds. These are being extensively used during development to achieve perfection in the product before technology is transferred to the main production line.",
  },
  {
    id: "activities",
    title: "R&D Activities",
    image: `${IMG}/activities.webp`,
    items: [
      {
        label: "Product Development",
        text: "MMAW Electrodes, FCAW Wires, Wear Plates, Thermal spray Powders, TWAS wires, Brazing and Soldering materials and Polymer coating materials.",
      },
      {
        label: "Application Development",
        text: "Procedural and parameter optimisation and solutions for reclamation welding-related issues. Developing applications, product recommendations, procedure qualification and implementation in the field.",
      },
      { label: "Failure Analysis", text: "Assessing reasons for failure and recommending preventive measures." },
      {
        label: "Wear & Corrosion Studies",
        text: "Specialized studies under different modes and test conditions, to rank different materials vis-à-vis their wear/corrosion resistance and also for recommending suitable materials for specific applications to enhance the service life of the industrial components.",
      },
      {
        label: "Structure-property Co-relation",
        text: "Metallography and micro-hardness studies to co-relate structures to properties. This helps in understanding the intrinsic properties of the alloys, to select the correct material for critical applications involving a specific set of wear mechanisms.",
      },
      {
        label: "Product Evaluation / Global Benchmarking",
        text: "Product evaluation of welding products against national/international standards for product differentiation and Global benchmarking.",
      },
      {
        label: "Collaborations / IPRs / Conferences",
        text: "R&D is involved in technology absorption, adaption and innovation through collaborative efforts with Research Institutes and Universities such as IIT-Madras, IIT-Mumbai, MSU-Baroda, SVNIT-Surat, PDPU-Gandhi Nagar etc. and also taking part in national and international seminars/conferences. The technological benefits derived from these events /collaborations are incorporated into the product and passed on to customers. New inventions of R&D Centre are protected through filing patents.",
      },
    ],
  },
];

// Lab photos from the live site's carousel, in the same order. rd-N.webp is the slider size (800px),
// rd-N-large.webp (1600px) only loads when a photo is opened full screen.
const GALLERY = Array.from({ length: 30 }, (_, i) => `${IMG}/gallery/rd-${i + 1}.webp`);
const GALLERY_LARGE = GALLERY.map((src) => src.replace(".webp", "-large.webp"));

const GOALS = [
  { icon: `${IMG}/ic-1.svg`, label: "Strong Scientific Credibility" },
  { icon: `${IMG}/ic-2.svg`, label: "Highly Differentiated Products, Solutions & Services" },
  { icon: `${IMG}/ic-3.svg`, label: "Networking with Research Institutes" },
  { icon: `${IMG}/ic-4.svg`, label: "State-of-the-art Facilities" },
  { icon: `${IMG}/ic-5.svg`, label: "Indigenisation of New Materials & Technologies" },
  { icon: `${IMG}/ic-6.svg`, label: "Conservation of Metallic Resources" },
];

export default function RdCentrePage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/about/about-banner.webp"
        mobileSrc="/assets/images/about/about-banner-mobile.webp"
        alt="About Us"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="EWAC R&D Centre" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <div className="exports-intro-wrap">
        <GearBackdrop className="exports-gear" />
        <section className="exports-intro">
          <div className="exports-intro-row">
            <div className="exports-intro-img" data-aos="fade-right">
              <img src={`${IMG}/activities.webp`} alt="Researcher at work in the EWAC R&D Centre" />
            </div>
            <div className="exports-intro-text" data-aos="fade-left">
              <h1 className="rd-title">EWAC R&amp;D Centre</h1>
              <p>
                EWAC R&amp;D Centre was inaugurated in 1980 by Dr. Rene Wasserman, a pioneer in low heat input
                &lsquo;Eutectic&rsquo; welding products for Maintenance and Repair Applications across all types of
                industries. The vision is to address customer-specific needs and provide cost-effective solutions for
                the reclamation of industrial components. Over the last four decades, the &lsquo;Research
                Centre&rsquo; has assimilated a high level of technological excellence. It assisted several Indian
                industries in improving industrial output by reducing the downtime of machinery and adopting advanced
                maintenance and repair welding processes and alloy systems.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="exports-history">
        <div className="container">
          <h2 data-aos="fade-up">Recognised by DSIR since 1982</h2>
          <p>
            EWAC R&amp;D Centre has been recognized by the &ldquo;Department of Scientific &amp; Industrial Research
            [DSIR], Govt. of India&rdquo; since 1982. The core strength lies in its team of experienced researchers
            and specialists who focus on product, process, and application developments. The key areas that were in
            focus are specified below:
          </p>
          <ul className="rd-focus">
            {FOCUS_AREAS.map((area, i) => (
              <li key={area} data-aos="fade-up" data-aos-delay={i * 60}>
                {area}
              </li>
            ))}
          </ul>

          <div className="rd-gallery">
            <PhotoGallery
              images={GALLERY}
              largeImages={GALLERY_LARGE}
              alt="EWAC R&D Centre laboratory"
              slideClassName="basis-full sm:basis-1/2 lg:basis-1/4"
            />
          </div>
        </div>
      </section>

      <RdFacilities facilities={FACILITIES} />

      <section className="rd-goals">
        <div className="container">
          <h2 data-aos="fade-up">EWAC R&amp;D Centre continues to Strive for&hellip;</h2>
          <ul className="rd-goal-grid">
            {GOALS.map((goal, i) => (
              <li className="rd-goal" key={goal.label} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <img src={goal.icon} alt="" />
                <span>{goal.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
