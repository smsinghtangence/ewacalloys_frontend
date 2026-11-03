import { marked } from "marked";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import SafetyContentsNav from "@/components/about/SafetyContentsNav";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function addPolicySectionAnchors(html) {
  const sections = [];
  const usedIds = new Set();
  const anchoredHtml = html.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (heading, content) => {
    const label = content
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'");
    const baseId = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
    let id = `privacy-${baseId}`;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `privacy-${baseId}-${suffix}`;
      suffix += 1;
    }

    usedIds.add(id);
    sections.push({ id, label });
    return heading.replace(/<h2\b[^>]*>/i, `<h2 id="${id}">`);
  });

  return { html: anchoredHtml, sections };
}

async function getPrivacyPolicy() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/privacy-policy?populate[0]=MetaSection&populate[1]=Banner`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`Privacy policy API failed: ${res.status} ${res.url}`);
      return null;
    }
    const { data } = await res.json();
    if (!data?.Content) return null;
    const html = await marked.parse(data.Content);
    const content = addPolicySectionAnchors(html);

    return {
      title: data.Title,
      updated: data.LastUpdated
        ? new Date(data.LastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        : "",
      html: content.html,
      sections: content.sections,
      meta: [].concat(data.MetaSection ?? [])[0],
      banner: data.Banner?.url ?? null,
    };
  } catch (error) {
    console.error("Privacy policy API error", error);
    return null;
  }
}


export async function generateMetadata() {
  const policy = await getPrivacyPolicy();
  const meta = policy?.meta;
  return {
    title: meta?.MetaTitle || "Privacy Policy | EWAC",
    description: meta?.MetaDescription,
    keywords: meta?.MetaKeyword,
    robots: meta?.MetaRobots,
  };
}

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  return (
    <>
      <InnerBanner
        src={policy?.banner ?? "/assets/images/legal/privacy-banner.webp"}
        mobileSrc={policy?.banner ?? "/assets/images/legal/privacy-banner-mobile.webp"}
        alt="Privacy Policy"
        className="blog-page-banner"
      />
      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Privacy Policy" />
        </div>
      </section>

      <section className="terms-simple privacy-simple">
        <div className="container">
          <div className="safety-layout privacy-layout">
            <SafetyContentsNav
              sections={policy?.sections ?? []}
              activeImage={policy?.banner ?? "/assets/images/legal/privacy-banner.webp"}
              help={{
                title: "Questions about privacy?",
                text: "Contact our team if you have questions about your personal information.",
              }}
            />
            <main className="safety-main privacy-main">
              <h1>{policy?.title || "Privacy Policy"}</h1>
              {policy?.updated && <p className="terms-updated">Last updated: {policy.updated}</p>}
              {policy && (
                <div
                  className="privacy-content"
                  dangerouslySetInnerHTML={{ __html: policy.html }}
                />
              )}
            </main>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}