
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { INSIGHTS_CASE_CARDS } from "@/components/blogs/blogData";

export const metadata = {
  title: "Case Studies | EWAC",
  description: "Case studies from EWAC Alloys.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/case-studies-banner.webp"
        mobileSrc="/assets/images/blogs/case-studies-banner-mobile.webp"
        alt="Case Studies"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Case Studies" />
        </div>
      </section>

      <PostListing cards={INSIGHTS_CASE_CARDS} activeTab="case-studies" />

      <ConsultCta welderDecoration />
    </>
  );
}
