import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import JobSearch from "@/components/careers/JobSearch";

export const metadata = {
  title: "Find Jobs | Careers at EWAC",
  description: "Search career opportunities at EWAC Alloys by keyword, job title, or location.",
};

export default function CareerJobsPage() {
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
          <Breadcrumb current="Find Jobs" trail={[{ label: "Careers", href: "/careers" }]} />
        </div>
      </section>

      <JobSearch />
    </>
  );
}
