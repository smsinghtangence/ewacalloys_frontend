import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import BoardDirectors from "@/components/about/BoardDirectors";

export const metadata = {
  title: "Board of Directors | EWAC",
  description: "Meet the Board of Directors of EWAC Alloys Limited.",
};

// Photos are in /public/assets/images/company-info/.
const DIRECTORS = [
  {
    name: "Rohit Gambhir",
    role: "Chairman",
    image: "rohit-gambhir.webp",
    bio: "Provides leadership to the Board and contributes to the governance and long-term direction of EWAC Alloys Limited.",
  },
  {
    name: "Debobroto Banerjee",
    role: "Director & Chief Executive Officer",
    image: "debobroto-banerjee.webp",
    bio: "Leads the company as Chief Executive Officer and serves on the Board of EWAC Alloys Limited.",
  },
  {
    name: "B Mohan",
    role: "Director",
    image: "b-mohan.webp",
    bio: "Serves on the Board of EWAC Alloys Limited, contributing to its governance and oversight.",
  },
  {
    name: "Jagannathan Palle Venkata",
    role: "Director",
    image: "jagannathan-palle-venkata.webp",
    bio: "Serves on the Board of EWAC Alloys Limited, contributing to its governance and oversight.",
  },
  {
    name: "Jaimon Antony",
    role: "Director",
    image: "jaimon-antony.webp",
    bio: "Serves on the Board of EWAC Alloys Limited, contributing to its governance and oversight.",
  },
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

          <BoardDirectors directors={DIRECTORS} />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
