import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import SafetyContentsNav from "@/components/about/SafetyContentsNav";

export const metadata = {
  title: "Investor Relations | EWAC",
  description: "EWAC Alloys Limited annual returns and CSR annual action plans.",
};

const DOCS = "/assets/docs/investor-relations";

const SECTIONS = [
  { id: "annual-returns", label: "Annual Returns" },
  { id: "csr-annual-action-plans", label: "CSR Annual Action Plans" },
];

// `file: null` = the live site lists the document but has no PDF attached yet; add the file to
// public/assets/docs/investor-relations/ and set its path here to turn the row into a link.
const ANNUAL_RETURNS = [
  { title: "Annual Return for the financial year 2023-24", label: "View Annual Return for the Financial year 2023-24", file: null },
  {
    title: "Annual return for the Financial year 2022-23",
    label: "View Annual Return for the Financial year 2022-23 (Annexure 2)",
    file: null,
  },
  {
    title: "Annual return for the Financial year 2021-22",
    label: "View Annual Return for the Financial year 2021-22 (Annexure 2)",
    file: null,
  },
  {
    title: "Annual return for the Financial year 2020-21",
    label: "View Annual Return for the Financial year 2020-21 (Annexure 1)",
    file: `${DOCS}/annual-return-2020-21.pdf`,
  },
];

const CSR_PLANS = [
  {
    title: "Annual Action Plan for the financial year 2024-25",
    label: "View Annual Action Plan for the Financial year 2024-25",
    file: `${DOCS}/csr-action-plan-2024-25.pdf`,
  },
  {
    title: "Revised Annual Action plan for 2023-24",
    label: "View Revised Annual Action plan for 2023-24",
    file: `${DOCS}/csr-action-plan-2023-24-revised.pdf`,
  },
  {
    title: "Annual Action Plan for the Financial year 2023-24",
    label: "View Annual Action Plan for the Financial year 2023-24",
    file: `${DOCS}/csr-action-plan-2023-24.pdf`,
  },
  {
    title: "Annual Action Plan for the Financial year 2022-23",
    label: "View Annual Action Plan for the Financial year 2022-23",
    file: `${DOCS}/csr-action-plan-2022-23.pdf`,
  },
  {
    title: "Annual Action Plan for the Financial year 2021-22",
    label: "View Annual Action Plan for the Financial year 2021-22",
    file: `${DOCS}/csr-action-plan-2021-22.pdf`,
  },
];

function SectionHeading({ number, children }) {
  return (
    <div className="safety-heading">
      <span className="safety-badge">{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function DocumentList({ documents }) {
  return (
    <ul className="ir-docs">
      {documents.map((doc) => (
        <li className="ir-doc" key={doc.title}>
          <i className="far fa-file-pdf ir-doc-icon" aria-hidden="true" />
          <div className="ir-doc-text">
            <h3>{doc.title}</h3>
            <p>{doc.label}</p>
          </div>
          {doc.file ? (
            <a className="safety-doc-link" href={doc.file} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          ) : (
            <span className="ir-doc-soon">PDF not available</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function InvestorRelationsPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/investor-relations/ir-banner.webp"
        mobileSrc="/assets/images/investor-relations/ir-banner-mobile.webp"
        alt="Investor Relations"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Investor Relations" />
        </div>
      </section>

      <section className="safety-section">
        <GearBackdrop className="safety-gear" />
        <div className="container">
          <h1 className="safety-title" data-aos="fade-up">
            Investor Relations
          </h1>

          <div className="safety-layout">
            <SafetyContentsNav sections={SECTIONS} />

            <div className="safety-main">
              <section id={SECTIONS[0].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="01">Annual Returns</SectionHeading>
                <div className="safety-body">
                  <DocumentList documents={ANNUAL_RETURNS} />
                </div>
              </section>

              <section id={SECTIONS[1].id} className="safety-block" data-aos="fade-up">
                <SectionHeading number="02">CSR Annual Action Plans</SectionHeading>
                <div className="safety-body">
                  <DocumentList documents={CSR_PLANS} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
