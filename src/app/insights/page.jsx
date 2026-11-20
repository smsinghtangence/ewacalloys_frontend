
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import InsightsTabs from "@/components/insights/InsightsTabs";
import { fetchStrapi } from "@/lib/catalog";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/insights").
export const generateMetadata = () => getPageMeta("/insights", {
  title: "Insights",
  description: "Blogs, news and case studies from EWAC Alloys on welding, hardfacing, thermal spraying and wear protection for industry.",
});

export const revalidate = 60;

export default async function InsightsPage() {
  // Blogs tab: the 9 newest blogs from Strapi; each card uses the first photo in the article.
  const blogs = await fetchStrapi("/api/blogs?filters[slug][$notNull]=true&sort=publishedAt:desc&pagination[pageSize]=9");
  const blogCards = blogs.map((blog) => ({
    image:
      blog.Content?.match(/<img[^>]+src="(?:https?:\/\/[^/"]+)?(\/uploads\/[^"]+)"/i)?.[1] ??
      "/assets/images/blogs/blogs-banner.webp",
    title: blog.Heading,
    href: `/blogs/${blog.slug}`,
  }));

  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/insights-banner.webp"
        mobileSrc="/assets/images/blogs/insights-banner-mobile.webp"
        alt="Insights"
        heading="Insights"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Insights" />
        </div>
      </section>

      <InsightsTabs blogCards={blogCards} />

      <ConsultCta welderDecoration />
    </>
  );
}
