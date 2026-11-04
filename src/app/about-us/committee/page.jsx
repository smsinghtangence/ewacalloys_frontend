import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import BoardCommittees from "@/components/about/BoardCommittees";

export const metadata = {
  title: "Committee | EWAC",
  description: "Meet the members of EWAC Alloys Limited's Audit, Nomination and Remuneration, and Corporate Social Responsibility Committees.",
};

const COMMITTEES = [
  {
    id: "audit-committee",
    name: "Audit Committee",
    members: [
      { name: "Mr. B Mohan", role: "Chairman", image: "b-mohan.webp" },
      { name: "Mr. Rohit Gambhir", role: "Member", image: "rohit-gambhir.webp" },
      { name: "Mr. Debobroto Banerjee", role: "Member", image: "debobroto-banerjee.webp" },
    ],
  },
  {
    id: "nomination-remuneration-committee",
    name: "Nomination and Remuneration Committee",
    members: [
      { name: "Mr. Rohit Gambhir", role: "Chairman", image: "rohit-gambhir.webp" },
      { name: "Mr. Debobroto Banerjee", role: "Member", image: "debobroto-banerjee.webp" },
      { name: "Mr. B Mohan", role: "Member", image: "b-mohan.webp" },
    ],
  },
  {
    id: "corporate-social-responsibility-committee",
    name: "Corporate Social Responsibility Committee",
    members: [
      { name: "Mr. Rohit Gambhir", role: "Chairman", image: "rohit-gambhir.webp" },
      { name: "Mr. Debobroto Banerjee", role: "Member", image: "debobroto-banerjee.webp" },
      { name: "Mr. B Mohan", role: "Member", image: "b-mohan.webp" },
    ],
  },
];

export default function CommitteePage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/company-info/board-banner.webp"
        mobileSrc="/assets/images/company-info/board-banner-mobile.webp"
        alt="Committee"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Committee" trail={[{ label: "About Us", href: "/about-us" }]} />
        </div>
      </section>

      <section className="board-section board-committee-section">
        <GearBackdrop className="board-gear" />
        <div className="container">
          <h1 className="board-title">Committee</h1>
          <BoardCommittees committees={COMMITTEES} />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
