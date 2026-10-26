import Link from "next/link";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";

export async function generateMetadata() {
  const policy = null;
  return {
    title: policy?.seoTitle ?? "Privacy Policy | EWAC",
    description:
      policy?.seoDescription ??
      "How EWAC Alloys collects, uses and protects the personal information you share through this website.",
  };
}

const LAST_UPDATED = "23 October 2026";

export default async function PrivacyPolicyPage() {
  const policy = null;

  return (
    <>
      <InnerBanner
        src="/assets/images/legal/privacy-banner.webp"
        mobileSrc="/assets/images/legal/privacy-banner-mobile.webp"
        alt="Privacy Policy"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Privacy Policy" />
        </div>
      </section>

      <section className="terms-simple">
        <div className="container">
          <h1>{policy?.title ?? "Privacy Policy"}</h1>
          {(policy?.lastUpdated || LAST_UPDATED) && (
            <p className="terms-updated">Last updated: {policy?.lastUpdated || LAST_UPDATED}</p>
          )}

          {policy ? (
            <div dangerouslySetInnerHTML={{ __html: policy.html }} />
          ) : (
            <>
              <p>
                EWAC Alloys Limited (&ldquo;EWAC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy.
                This Privacy Policy explains how we collect, use and protect information when you visit this website
                or contact us through it.
              </p>

              <h2>1. Information we collect</h2>
              <p>
                We may collect information you choose to provide, such as your name, email address, phone number,
                company and the contents of your enquiry. When you browse the website, basic technical information
                such as your browser, device and pages visited may also be collected.
              </p>

              <h2>2. How we use your information</h2>
              <p>We use this information to:</p>
              <ul>
                <li>respond to your questions and provide the information or services you request;</li>
                <li>operate, maintain and improve this website; and</li>
                <li>protect the website and meet our legal obligations.</li>
              </ul>

              <h2>3. Cookies and similar technologies</h2>
              <p>
                This website may use cookies or similar technologies to support its operation and understand how it
                is used. You can manage cookies through your browser settings; disabling them may affect some
                website features.
              </p>

              <h2>4. Sharing and retention</h2>
              <p>
                We do not sell your personal information. We may share it with service providers who help us operate
                the website or respond to you, or where disclosure is required by law. We retain information only
                for as long as needed for these purposes or as required by law.
              </p>

              <h2>5. Security and external links</h2>
              <p>
                We use reasonable measures to protect information, but no method of transmission or storage is
                completely secure. This website may link to third-party sites; their privacy practices are governed
                by their own policies.
              </p>

              <h2>6. Your choices and this policy</h2>
              <p>
                You may contact us to ask about or request changes to personal information you have provided, subject
                to applicable law. We may update this policy from time to time; the date above indicates when it was
                last updated.
              </p>

              <h2>7. Contact us</h2>
              <p>
                For questions about this Privacy Policy or your information, email{" "}
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
