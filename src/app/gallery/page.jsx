import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import LifeGallery from "@/components/life/LifeGallery";

export const metadata = {
  title: "Gallery | EWAC",
  description: "Photos from EWAC workshops, training sessions, conferences and exhibitions.",
};

export default function GalleryPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/gallery/gallery-banner.webp"
        mobileSrc="/assets/images/gallery/gallery-banner-mobile.webp"
        alt="Gallery"
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
