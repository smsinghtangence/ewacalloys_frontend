
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { INSIGHTS_NEWS_CARDS } from "@/components/blogs/blogData";

export const metadata = {
  title: "News | EWAC",
  description: "News and announcements from EWAC Alloys.",
};

export default function NewsPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/news-banner.webp"
        mobileSrc="/assets/images/blogs/news-banner-mobile.webp"
        alt="News"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="News" />
        </div>
      </section>

      <PostListing cards={INSIGHTS_NEWS_CARDS} activeTab="news" />

      <ConsultCta welderDecoration />
    </>
  );
}
