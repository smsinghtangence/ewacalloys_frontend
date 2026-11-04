import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import PhotoGallery from "@/components/shared/PhotoGallery";
import ErfStats from "@/components/services/ErfStats";

export const metadata = {
  title: "Training | EWAC",
  description:
    "EWAC Training Institute at Ankleshwar has conducted Maintenance Welding Training Programmes for employees, customers and the global sales team for over 45 years.",
};

const IMG = "/assets/images/trainings";

const STATS = [
  { target: 75, label: "New Joinee", suffix: "" },
  { target: 250, label: "Clients", suffix: "" },
  { target: 50, label: "Technicians are trained every year", suffix: "" },
];

// Training facility photos from the live site, in the same order (click one to view full screen).
const GALLERY = Array.from({ length: 24 }, (_, i) => `${IMG}/gallery/training-${i + 1}.webp`);

const STEPS = [
  { image: `${IMG}/step-1.webp`, title: "Understanding Training Needs & Assigning Objectives" },
  { image: `${IMG}/step-2.webp`, title: "Designing Training Module" },
  { image: `${IMG}/step-3.webp`, title: "Implementation of Program" },
  { image: `${IMG}/step-4.webp`, title: "Evaluation & Feedback" },
];

const SAVINGS = [
  { icon: "fa-hourglass-half", text: "Prolonging the life of components" },
  { icon: "fa-cogs", text: "Reducing the consumption of spare parts" },
  { icon: "fa-chart-line", text: "Reducing the downtime due to premature failure & increase in profitability" },
  { icon: "fa-boxes", text: "Reducing Inventory" },
];

const TRAINING_TYPES = [
  "Basic Training for new Joinees for over 45 days",
  "Refresher Training for experienced Employees in the field",
  "Customer Training on Maintenance & Repair",
  "Customised Industry Based Training on critical Applications of Steel, Cement, Power, Mining, Sugar, Refinery, etc",
  "Customised Product/Process Training on Brazing, Soldering, MMAW, MIG, TIG, Welding Equipment’s, Thermal Spray Techniques, etc.",
  "Leadership Development Programme & Sharpening Skills Program which provides a growth platform for various aspiring & high performing employees to next level of Leadership",
  "Global Training to our Business Associates & Sales Team on Products, Process & Applications",
];

const CSR = [
  "Skill Enhancement in the field of Maintenance Welding by conducting sessions at premises or inhouse. Our clients includes SAIL, NTPC, Indian Railways, Coal India, Tata Steel, Jindal Steel & Power Limited, JSW, Aditya Birla Group, Holcim- Lafarge Group, Reliance, Essar, Dalmia Cement, JK Lakshmi, Shree Cement, State govt Power Units like WBPDCL, MAHGENCO, MPEB, Damodar Valley Corporation, etc",
  "Skill Enhancement in various ITI, Polytechnic & Engineering Colleges by conducting various Technical cum Practical Modules related to Welding & Coating Solutions. Providing exposure & expertise to students on Welding Applications & Solutions in various Industries.",
  "Certified Courses for Welder Training, Engineer Training in Brazing, Soldering, MMAW, GMAW, TIG, Thermal Spray Techniques, etc.",
  "Tie up with MS University Vadodara for grooming, mentoring, sponsoring candidates for ME Welding Technology & placing them suitably thereafter.",
  "Establishing Skill Development Training Centres at Govt ITI, Engineering Colleges, Industries on Advance Welding Set Up & providing Training to the candidates on new technology in Maintenance & Repair",
  "Creating Specialist in the field of Welding Solution thru proper Welding Preparation, Alloy Selection & Execution",
];

export default function TrainingsPage() {
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
          <Breadcrumb current="Training" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <div className="exports-intro-wrap">
        <GearBackdrop className="exports-gear" />
        <section className="exports-intro">
          <div className="exports-intro-row">
            <div className="exports-intro-img" data-aos="fade-right">
              <img src={`${IMG}/intro.webp`} alt="Welding training session at the EWAC Institute" />
            </div>
            <div className="exports-intro-text" data-aos="fade-left">
              <h1 className="rd-title">Training</h1>
              <p>
                EWAC Training Institute is dedicated &amp; committed towards conducting Maintenance Welding Training
                Programmes for its employees, customers &amp; global sales team since last 45 years &amp; more to
                promote advanced knowledge and skills of Maintenance Welding. The Program is designed for Welders,
                Supervisors, Engineers &amp; Managers about techniques &amp; methods required to be adopted to carry out
                a maintenance welding job successfully.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="tr-institute">
        <div className="container">
          <h2 className="tk-title rw-record-title" data-aos="fade-up">EWAC Institute</h2>
          <ErfStats stats={STATS} className="tr-stats" />
        </div>
      </section>

      <section className="exports-history tr-facilities">
        <div className="container">
          <h2 data-aos="fade-up">Training Facilities</h2>
          <p>
            The EWAC Institute has been set up in the premises of EWAC Alloys Limited at Ankleshwar, Gujarat. The
            Institute has Modular Training Facilities well equipped with Training hall which can encompass more than 50
            participants together with audio visual aids &amp; computer aided graphics, animations &amp; presentations.
            Besides the Institute also possesses the State of Art Technology Welding Lab which is among the best in
            Asia. The lab has modern amenities like Automated Fume Extraction System &amp; Gas Line Mani-folding, Expo
            with Prototype Job Models, Thermal Spray Systems, Aesthetically designed Arc Welding &amp; Gas Brazing
            Systems, Industry Process Flow &amp; a huge numbers of actual jobs which are subjected to Maintenance &amp;
            Repair.
          </p>
          <div className="rd-gallery">
            <PhotoGallery
              images={GALLERY}
              alt="EWAC Institute training facility"
              slideClassName="basis-full sm:basis-1/2 lg:basis-1/4"
            />
          </div>
        </div>
      </section>

      <section className="tr-method">
        <div className="container">
          <h2 className="tk-title" data-aos="fade-up">Methodology of EWAC training</h2>
          <ol className="tr-steps">
            {STEPS.map((step, i) => (
              <li className="tr-step" key={step.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="tr-step-img">
                  <img src={step.image} alt="" loading="lazy" />
                  <span className="tr-step-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{step.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tr-savings">
        <div className="container">
          <h2 data-aos="fade-up">The Institute aims to Savings for Customers through methods &amp; techniques involving</h2>
          <ul className="tr-savings-grid">
            {SAVINGS.map((item, i) => (
              <li key={item.text} data-aos="fade-up" data-aos-delay={i * 100}>
                <i className={`fas ${item.icon}`} aria-hidden="true" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tr-types">
        <div className="container">
          <div className="tr-types-row">
            <div className="tr-types-img" data-aos="fade-right">
              <img src={`${IMG}/types.webp`} alt="Trainees at the EWAC Institute" loading="lazy" />
            </div>
            <div className="tr-types-text" data-aos="fade-left">
              <h2>Types of Training:</h2>
              <div className="tk-underline" />
              <p>
                EWAC Institute offers comprehensive training for skill enhancement for its employees as well as its
                customers. Some of the training courses are:
              </p>
              <ul>
                {TRAINING_TYPES.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tk-panel tk-panel--blue tr-databank" data-aos="fade-up">
            <p>
              The EWAC Institute maintains an online data bank called &ldquo;Click to Institute&rdquo; which encompasses
              a huge database of applications successfully executed in various Industries. It is one of the Biggest
              Welding Data Bank where one can learn Industry Process &amp; Applications, Products, Success Stories of
              Enormous list of Applications spread across all Industries, Motivational Quotes from our Valuable
              Customers, Cost Economics of Various Applications, etc. The Institute is approved by RDSO, Govt body for
              conducting specialized training on Maintenance &amp; Repair. Every year the Institute trains various Weld
              Technicians on execution of various jobs in Indian Railways. Over the years EWAC Institute is committed
              towards making the training experience intimate and meaningful leading to transformation of an associate
              to a Welding Specialist. The unique style of imparting knowledge has not only created numerous Expertise
              in the field of Welding Solutions but has also instilled the confidence and skills required to be an
              Entrepreneur in Welding Practices.
            </p>
          </div>
        </div>
      </section>

      <section className="exports-history tr-csr">
        <div className="container">
          <h2 data-aos="fade-up">Contribution towards CSR</h2>
          <ul className="tr-csr-grid">
            {CSR.map((item, i) => (
              <li className="tr-csr-card" key={item.slice(0, 40)} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <span className="tr-csr-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
