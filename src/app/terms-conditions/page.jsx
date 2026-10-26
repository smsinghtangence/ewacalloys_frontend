
import Link from "next/link";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";

export async function generateMetadata() {
  const terms = null; // static page: no CMS fetch
  return {
    title: terms?.seoTitle ?? "Terms & Conditions | EWAC",
    description:
      terms?.seoDescription ??
      "The terms and conditions for using the EWAC Alloys website and its product information.",
  };
}

const LAST_UPDATED = "23 October 2026";

export default async function TermsPage() {
  const terms = null; // static page: no CMS fetch

  return (
    <>
      <InnerBanner
        src="/assets/images/legal/terms-banner.webp"
        mobileSrc="/assets/images/legal/terms-banner-mobile.webp"
        alt="Terms and Conditions"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Terms & Conditions" />
        </div>
      </section>

      <section className="terms-simple">
        <div className="container">
          <h1>{terms?.title ?? "Terms & Conditions"}</h1>
          {(terms ? terms.lastUpdated : LAST_UPDATED) && (
            <p className="terms-updated">Last updated: {terms ? terms.lastUpdated : LAST_UPDATED}</p>
          )}

          {terms ? (
            <div dangerouslySetInnerHTML={{ __html: terms.html }} />
          ) : (
            <>
          <p>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of this website, operated by EWAC Alloys
            Limited (&ldquo;EWAC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website you agree to them. If
            you do not agree, please do not use it.
          </p>

          <h2>1. Using this website</h2>
          <p>You agree to use the website only for lawful purposes. You must not:</p>
          <ul>
            <li>try to gain unauthorised access to the site or the systems connected to it;</li>
            <li>introduce viruses or any code intended to disrupt or damage the site;</li>
            <li>copy or republish our content in bulk without our written permission.</li>
          </ul>

          <h2>2. Product information</h2>
          <p>
            Product descriptions, specifications, images and technical data are general guidance only. They are not a
            binding offer or a guarantee of performance in your specific conditions. Please confirm suitability and
            availability with our technical team before relying on them. Material Safety Data Sheets (MSDS) are available
            on request.
          </p>

          <h2>3. Intellectual property</h2>
          <p>
            The EWAC name, logo and all text, images and designs on this website belong to EWAC Alloys Limited or its
            licensors. You may view and print pages for your own personal or internal business use. Any other use needs
            our prior written consent.
          </p>

          <h2>4. Information you send us</h2>
          <p>
            When you contact us through the website, you agree that the information you give is accurate and that we may
            use it to respond to you. Please do not send confidential or sensitive information through the contact form.
          </p>

          <h2>5. Third-party links</h2>
          <p>
            The website may link to other sites. We do not control them and are not responsible for their content or
            practices.
          </p>

          <h2>6. Safe use</h2>
          <p>
            Welding, cutting and thermal spraying involve real hazards. Information on this website does not replace
            proper training, the relevant MSDS or applicable safety standards. Always follow safe working practices.
          </p>

          <h2>7. Disclaimer and liability</h2>
          <p>
            The website is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law, we do not guarantee that
            it will be error-free or always available, and we are not liable for any indirect or consequential loss
            arising from its use. Nothing in these Terms limits any liability that cannot be limited by law.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. The date at the top of this page shows when they last changed.
            Continuing to use the website means you accept the updated Terms.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These Terms are governed by the laws of India, and any dispute will be subject to the courts of competent
            jurisdiction in India.
          </p>

          <h2>10. Contact us</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:enquiry@ewacalloys.com">enquiry@ewacalloys.com</a> or use our{" "}
            <Link href="/contact-us">contact form</Link>.
          </p>
            </>
          )}
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
