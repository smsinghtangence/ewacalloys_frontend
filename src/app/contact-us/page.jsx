import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import ContactForm from "@/components/contact/ContactForm";
import OfficeInfoCard from "@/components/contact/OfficeInfoCard";
import { getContactPage } from "@/lib/contactPage";
import { toMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  // Meta comes from the Contact Page's MetaSection in Strapi (src/lib/seo.js).
  const { meta } = await getContactPage();
  return toMetadata({
    meta,
    fallback: { title: "Contact Us", description: "Get in touch with EWAC's technical team." },
    path: "/contact-us",
  });
}

export default async function ContactUsPage() {
  const page = await getContactPage();

  return (
    <>
      <InnerBanner
        src={page.banner}
        mobileSrc={page.mobileBanner}
        alt={page.bannerAlt}
        heading="Contact Us"
        className="blog-page-banner"
      />

      <section className="contact-breadcrumb-bar">
        <div className="container">
          <Breadcrumb current="Contact us" />
        </div>
      </section>

      <section className="contact-section">
        <GearBackdrop />

        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="contact-form-card">
                <h2 className="contact-form-title">{page.formTitle}</h2>
                <p className="contact-form-sub">{page.formSubtitle}</p>
                <ContactForm countries={page.countries} interests={page.interests} />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-map-card">
                <img src={page.map} alt={page.mapAlt} />
              </div>

              <OfficeInfoCard title={page.officesTitle} offices={page.offices} />
            </div>
          </div>
        </div>

        <div className="blog-decor-welder" aria-hidden="true">
          <img src="/assets/images/blogs/blog-decor-welder.svg" alt="" />
        </div>
      </section>

      <ConsultCta />
    </>
  );
}
