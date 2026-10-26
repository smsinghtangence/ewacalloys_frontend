
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import InsightsTabs from "@/components/insights/InsightsTabs";

export const metadata = {
  title: "Insights | EWAC",
  description: "Blogs, news, and case studies from EWAC Alloys.",
};

export default function InsightsPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/insights-banner.webp"
        mobileSrc="/assets/images/blogs/insights-banner-mobile.webp"
        alt="Insights"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Insights" />
        </div>
      </section>

      <InsightsTabs />

      <ConsultCta welderDecoration />
    </>
  );
}
