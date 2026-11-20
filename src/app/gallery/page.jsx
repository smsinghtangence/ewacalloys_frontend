import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import LifeGallery from "@/components/life/LifeGallery";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/gallery").
export const generateMetadata = () => getPageMeta("/gallery", {
  title: "Gallery",
  description: "Photos from EWAC Alloys: our plants, R&D centre, events, trainings and life at EWAC.",
});

export default function GalleryPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/gallery/gallery-banner.webp"
        mobileSrc="/assets/images/gallery/gallery-banner-mobile.webp"
        alt="Gallery"
        heading="Gallery"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Gallery" />
        </div>
      </section>

      <LifeGallery showHeading={false} />

      <ConsultCta welderDecoration />
    </>
  );
}
