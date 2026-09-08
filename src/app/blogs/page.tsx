import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import BlogListCard from "@/components/shared/BlogListCard";
import { BLOG_LIST } from "@/components/blogs/blogData";

export const metadata: Metadata = {
  title: "Blogs | EWAC",
  description: "Technical articles and insights from EWAC Alloys.",
};

const INDUSTRY_FILTERS = [
  "Steel",
  "Cement",
  "Power",
  "Sugar",
  "Mining",
  "Oil & Gas",
  "Tyre",
  "Port",
  "Road Transport",
  "Railways",
];

export default function BlogsPage() {
  return (
    <>
      <section className="blog-page-banner">
        <img src="/assets/images/blogs/blogs-banner.webp" alt="Blogs" />
      </section>

      <section className="blog-toolbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <Breadcrumb current="Blogs" />
            </div>
            <div className="col-md-6 text-md-end">
              <div className="blog-filter-wrap">
                <select className="blog-filter-select" id="blogIndustryFilter" defaultValue="">
                  <option value="" disabled>
                    Select Industry
                  </option>
                  {INDUSTRY_FILTERS.map((industry) => (
                    <option key={industry}>{industry}</option>
                  ))}
                </select>
                <span className="blog-filter-arrow">
                  <i className="fas fa-chevron-down" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-list-section">
        <GearBackdrop />

        <div className="blog-decor-welder" aria-hidden="true">
          <img src="/assets/images/blogs/blog-decor-welder.svg" alt="" />
        </div>

        <div className="container">
          <div className="row gy-5 gx-4">
            {BLOG_LIST.map((card) => (
              <div className="col-lg-4 col-md-6" key={card.title}>
                <BlogListCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
