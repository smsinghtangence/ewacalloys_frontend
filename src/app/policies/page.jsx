import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import PolicySlider from "@/components/policies/PolicySlider";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/policies").
export const generateMetadata = () => getPageMeta("/policies", {
  title: "Policies and Certifications",
  description: "Corporate policies of EWAC Alloys Limited, including Whistle Blower, Anti-Bribery and Anti-Corruption, Prevention of Sexual Harassment, Remuneration and CSR policies.",
});

export default function PoliciesPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/policies/policies-banner.webp"
        mobileSrc="/assets/images/policies/policies-banner-mobile.webp"
        alt="Policies and Certifications"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Policies and Certifications" />
        </div>
      </section>

      <section className="policies-section">
        <GearBackdrop className="policies-gear" />
        <div className="container">
          <h1 className="life-heading" data-aos="fade-up">
            Policies and Certifications
          </h1>
          <PolicySlider />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
