import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { fetchStrapi } from "@/lib/catalog";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/blogs").
export const generateMetadata = () => getPageMeta("/blogs", {
  title: "Blogs",
  description: "Read EWAC Alloys blogs on welding electrodes, thermal spray powders, HVOF coatings, wear plates and maintenance welding.",
});

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await fetchStrapi("/api/blogs?sort=publishedAt:desc&pagination[pageSize]=100");

  // Strapi has no card image field, so each card uses the first photo in the article
  // (made relative so it loads through the /uploads rewrite in next.config.mjs).
  const cards = blogs
    .filter((blog) => blog.Heading && blog.slug)
    .map((blog) => ({
      image:
        blog.Content?.match(/<img[^>]+src="(?:https?:\/\/[^/"]+)?(\/uploads\/[^"]+)"/i)?.[1] ??
        "/assets/images/blogs/blogs-banner.webp",
      title: blog.Heading,
      href: `/blogs/${blog.slug}`,
    }));

  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/blogs-banner.webp"
        mobileSrc="/assets/images/blogs/blogs-banner-mobile.webp"
        alt="Blogs"
        heading="Blogs"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <Breadcrumb current="Blogs" />
            </div>

          </div>
        </div>
      </section>

      <PostListing cards={cards} activeTab="blogs" />

      <ConsultCta welderDecoration />
    </>
  );
}
