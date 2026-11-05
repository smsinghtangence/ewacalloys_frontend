import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";

export const metadata = {
  title: "Apply | Careers at EWAC",
  description: "Apply to EWAC Alloys as an experienced professional or for early careers.",
};

// ?type=experienced or ?type=early (from the Careers page cards) opens that form's tab.
export default async function CareerJobsPage({ searchParams }) {
  const { type } = await searchParams;

  return (
    <>
      <InnerBanner
        src="/assets/images/life/life-banner.webp"
        mobileSrc="/assets/images/life/life-banner-mobile.webp"
        alt="EWAC colleagues at work"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Apply" trail={[{ label: "Careers", href: "/careers" }]} />
        </div>
      </section>

      <section className="career-apply-section">
        <div className="container">
          <div className="career-apply-heading">
            <p className="careers-eyebrow">Take the next step</p>
            <h1>Apply to EWAC</h1>
            <p>Choose your career path, fill in your details and upload your resume. Fields marked * are required.</p>
          </div>

          <CareerApplicationForm initialType={type} />
        </div>
      </section>
    </>
  );
}
