
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { CASE_STUDY_POST_CARDS } from "@/components/insights/dummyPosts";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/case-studies").
export const generateMetadata = () => getPageMeta("/case-studies", {
  title: "Case Studies",
  description: "See how EWAC Alloys solves wear problems in cement, power, steel, sugar and refinery plants with hardfacing, thermal spray coatings and wear plates.",
});

export default function CaseStudiesPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/case-studies-banner.webp"
        mobileSrc="/assets/images/blogs/case-studies-banner-mobile.webp"
        alt="Case Studies"
        heading="Case Studies"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Case Studies" />
        </div>
      </section>

      <PostListing cards={CASE_STUDY_POST_CARDS} activeTab="case-studies" />

      <ConsultCta welderDecoration />
    </>
  );
}
