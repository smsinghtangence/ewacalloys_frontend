
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PostListing from "@/components/shared/PostListing";
import ConsultCta from "@/components/shared/ConsultCta";
import { BLOG_LIST } from "@/components/blogs/blogData";

export const metadata = {
  title: "Blogs | EWAC",
  description: "Technical articles and insights from EWAC Alloys.",
};



export default function BlogsPage() {
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
    
      <PostListing cards={BLOG_LIST} activeTab="blogs" />

      <ConsultCta welderDecoration />
    </>
  );
}
