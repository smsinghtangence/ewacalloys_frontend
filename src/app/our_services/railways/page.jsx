import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import RailwayGallery from "@/components/services/RailwayGallery";

export const metadata = {
  title: "Railways | EWAC",
  description:
    "EWAC Offers Techno-Economical Turnkey Solution to enhance Track Life & Smooth Running of Train: reconditioning of Points & Crossings, Wheel Burns & Scabs and Tie Tamping Tools.",
};

const IMG = "/assets/images/railways";

const RECORD = [
  { value: "50,000", label: "Crossings & Tongue Rails" },
  { value: "10 Cr Sq CM", label: "Wheelburns & Scabs" },
  { value: "1 Lakh", label: "Tie Tamping Tools" },
];

// Each application alternates: text on the left with a red panel, then photos on the left with a blue panel.
const APPLICATIONS = [
  {
    title: "Points & Crossing",
    images: [`${IMG}/crossing-1.png`, `${IMG}/crossing-2.png`, `${IMG}/crossing-3.png`],
    text: [
      "Whenever a train changes the direction, it must pass through The Points & Crossings and that is why it is referred to as “Turn Out” also. Each Point & Crossing or Turn Out is subjected to wear & tear because of the Impact, Friction & Some amount of Abrasion & Erosion caused by Train Wheel (Rolling Stock).",
      "EWAC Specially developed Low Heat Input Welding Electrodes are used for Reconditioning of worn-out Points & Crossings which gives extended life and reduces the down time of Rail Tracks.",
    ],
  },
  {
    title: "Wheel Burns & Scabs",
    images: [`${IMG}/wheel-burn-1.png`, `${IMG}/wheel-burn-2.png`, `${IMG}/wheel-burn-3.png`],
    text: [
      "Rolling contact fatigue and thermal/traction defects are common phenomena on rail surfaces due to rolling contact characteristics of rail-wheel interactions. Several types of defects such as gauge corner checking, shelling, flaking, or running surface checking, spalling, wheel-burns, scabs, squats etc, arise due to the contact between the surfaces, which are associated with unfavourable changes in metallurgical, mechanical and wear resistance properties of the rails.",
      "Wheel burn defects are caused by the continuous slipping of the locomotive or traction wheels on the rails, which occurs when the longitudinal creepage between wheels and rails reaches saturation. To address the issue, EWAC uses State of the Art Thermal Spray Technology & Specially developed Thermal Spray Powder for Reconditioning of Wheel burns, Scabs & Low joints and helps Railways in getting extended life of Tracks.",
    ],
  },
  {
    title: "Tie Tamping Tool",
    images: [`${IMG}/tamping-1.png`, `${IMG}/tamping-2.png`],
    text: [
      "Tie Tamping Tools gets worn out due to severe Impact & Abrasion while doing the ballast tamping. EWAC uses specially designed Flux Cored Wires for Reconditioning of Tie Tamping Tools which helps in extending the life of Tool. This results in huge cost savings for the Railways in terms of procurement of new tools & cost of replacement due to reduction in BCM downtime.",
    ],
  },
];

export default function RailwaysPage() {
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
          <Breadcrumb current="Railways" trail={[{ label: "Our Services", href: "/our_services/turnkey-solution" }]} />
        </div>
      </section>

      <section className="tk-intro">
        <GearBackdrop className="tk-gear" />
        <div className="container">
          <div className="tk-intro-stage">
            <div className="tk-intro-img" data-aos="fade-right">
              <img src={`${IMG}/intro.png`} alt="Welder reconditioning a rail track on site" />
            </div>
            <h1 className="tk-heading" data-aos="fade-left">
              Railways
            </h1>
            <div className="tk-underline rw-intro-underline" data-aos="fade-left" data-aos-delay="100" />
            <div className="tk-panel tk-panel--blue tk-intro-panel rw-intro-panel" data-aos="fade-left" data-aos-delay="200">
              <p>
                EWAC Alloys Limited, the pioneer in the &lsquo;Reclamation of Rail Tracks to the Railway
                Industry&rsquo;, has been serving the Indian Railways for more than 25 years in track reconditioning and
                tie tamping tools reconditioning. We have RDSO approved Welding Consumables in the form of Stick
                Electrodes, Microflow Powders and also FCAW Wire to cater to various critical applications like Points
                and Crossings, Wheel-burns of Scabs and Tie Tamping Tools.
              </p>
              <p>
                RDSO (Research Designs and Standards Organisations) approves our Training Institute at Ankleshwar to
                train welders. We impart training to all the welders before putting them on the job.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tk-industries rw-record">
        <div className="container">
          <h2 className="tk-title rw-record-title">Proven track record</h2>
          <p className="tk-industries-lead">
            A strong team of weld technicians and crew members allows us to execute the work at nearly 50 locations
            with efficacy and productivity at a time. We have a proven track record of Reconditioning approximately:
          </p>
          <div className="rw-stats">
            {RECORD.map((item, i) => (
              <div className="rw-stat" key={item.label} data-aos="fade-up" data-aos-delay={i * 100}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {APPLICATIONS.map((app, i) => {
        const reverse = i % 2 === 1;
        return (
          <section className={`rw-app${reverse ? " rw-app--reverse" : ""}`} key={app.title}>
            <div className="container">
              <div className="rw-app-stage">
                <div className="rw-app-text" data-aos={reverse ? "fade-left" : "fade-right"}>
                  <h2 className="tk-heading">{app.title}</h2>
                  <div className="tk-underline" />
                  <div className={`tk-panel ${reverse ? "tk-panel--blue" : "tk-panel--red"} rw-app-panel`}>
                    {app.text.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                </div>
                <div className="rw-gallery" data-aos={reverse ? "fade-right" : "fade-left"}>
                  <RailwayGallery images={app.images} alt={app.title} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <ConsultCta welderDecoration />
    </>
  );
}
