import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import InsightsTabs from "@/components/insights/InsightsTabs";

export const metadata: Metadata = {
  title: "Insights | EWAC",
  description: "Blogs, news, and case studies from EWAC Alloys.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="blog-page-banner">
        <img src="/assets/images/blogs/insights-banner.webp" alt="Insights" />
      </section>

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Insights" />
        </div>
      </section>

      <InsightsTabs />

      <ConsultCta gearDecoration />
    </>
  );
}
