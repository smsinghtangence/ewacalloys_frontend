import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";

export const metadata = {
  title: "Board of Directors | EWAC",
  description: "Meet the Board of Directors of EWAC Alloys Limited.",
};

// Photos are in /public/assets/images/company-info/. Set `social` to a director's X (Twitter) profile URL.
const DIRECTORS = [
  { name: "Rohit Gambhir", role: "Chairman", image: "rohit-gambhir.webp", social: "#" },
  { name: "Debobroto Banerjee", role: "Director & Chief Executive Officer", image: "debobroto-banerjee.webp", social: "#" },
  { name: "B Mohan", role: "Director", image: "b-mohan.webp", social: "#" },
  { name: "Jagannathan Palle Venkata", role: "Director", image: "jagannathan-palle-venkata.webp", social: "#" },
  { name: "Jaimon Antony", role: "Director", image: "jaimon-antony.webp", social: "#" },
];

export default function CompanyInfoPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/company-info/board-banner.webp"
        mobileSrc="/assets/images/company-info/board-banner-mobile.webp"
        alt="Board of Directors"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Board of Directors" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <section className="board-section">
        <GearBackdrop className="board-gear" />
        <div className="container">
          <h1 className="board-title" data-aos="fade-up">
            Board of Directors
          </h1>

          <div className="board-grid">
            {DIRECTORS.map((director, index) => (
              <article className="board-card" key={director.name} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <div className="board-photo">
                  <img src={`/assets/images/company-info/${director.image}`} alt={director.name} />
                </div>
                <div className="board-info">
                  <h2>{director.name}</h2>
                  <p>{director.role}</p>
                  <a
                    href={director.social}
                    className="board-social"
                    aria-label={`${director.name} on X`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-x-twitter" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
