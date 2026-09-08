import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import ContactForm from "@/components/contact/ContactForm";
import OfficeInfoCard from "@/components/contact/OfficeInfoCard";

export const metadata: Metadata = {
  title: "Contact Us | EWAC",
  description: "Get in touch with EWAC's technical team.",
};

export default function ContactUsPage() {
  return (
    <>
      <section className="blog-page-banner">
        <img src="/assets/images/blogs/contact-us-banner.webp" alt="Contact Us" />
      </section>

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
                <h2 className="contact-form-title">Let&apos;s Talk!</h2>
                <p className="contact-form-sub">
                  Get in touch with us using the enquiry form or contact details below.
                </p>
                <ContactForm />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-map-card">
                <img src="/assets/images/blogs/contact-map.webp" alt="EWAC Alloys Limited location map" />
              </div>

              <OfficeInfoCard />
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
