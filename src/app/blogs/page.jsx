
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { getBlogPosts } from "@/lib/blogs";

export const metadata = {
  title: "Blogs | EWAC",
  description: "Technical articles and insights from EWAC Alloys.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  const cards = posts.map((post) => ({
    image: post.image,
    title: post.title,
    href: `/blogs/${post.slug}`,
  }));

  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/blogs-banner.webp"
        mobileSrc="/assets/images/blogs/blogs-banner-mobile.webp"
        alt="Blogs"
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
