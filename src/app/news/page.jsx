
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { NEWS_POST_CARDS } from "@/components/insights/dummyPosts";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/news").
export const generateMetadata = () => getPageMeta("/news", {
  title: "News",
  description: "Latest news from EWAC Alloys on welding consumables, wear protection solutions, thermal spraying and industry events.",
});

export default function NewsPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/news-banner.webp"
        mobileSrc="/assets/images/blogs/news-banner-mobile.webp"
        alt="News"
        heading="News"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="News" />
        </div>
      </section>

      <PostListing cards={NEWS_POST_CARDS} activeTab="news" />

      <ConsultCta welderDecoration />
    </>
  );
}
