import Link from "next/link";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import { INDUSTRY_DETAILS } from "@/components/industries/industryDetails";
import { getIndustries } from "@/lib/catalog";
import { getPageMeta } from "@/lib/seo";

export const revalidate = 60;

// Title, description and robots come from Strapi → Page SEO (path "/our_industries").
export const generateMetadata = () => getPageMeta("/our_industries", {
  title: "Industries We Serve",
  description: "EWAC Alloys provides welding, hardfacing and wear protection solutions for steel, cement, power, sugar, mining, refineries, tyre, port, road transport and railways.",
});

// Strapi slug → slug used in industryDetails.js (same aliases as the detail page).
const DETAIL_SLUG = { "oil-and-gas-refineries": "oil-gas-refineries" };

// Card text for industries whose page is not in industryDetails.js (taken from that page's intro).
const EXTRA_TEXT = {
  railways:
    "EWAC Alloys Limited, the pioneer in the Reclamation of Rail Tracks to the Railway Industry, has been serving the Indian Railways for more than 25 years in track reconditioning and tie tamping tools reconditioning.",
};

// Short card text from the first paragraph of the industry's detail content.
function excerpt(html = "", max = 170) {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

// Order, names, photos and links come from Strapi → Industry. If Strapi is unreachable, the industries
// that have a detail page are listed instead.
async function getIndustryCards() {
  const strapiIndustries = await getIndustries();
  if (strapiIndustries.length === 0) {
    return INDUSTRY_DETAILS.map((detail) => ({
      key: detail.slug,
      name: detail.name,
      href: `/our_industries/${detail.slug}`,
      image: detail.image,
      text: excerpt(detail.description[0]),
    }));
  }
  return strapiIndustries.map((industry) => {
    const detail = INDUSTRY_DETAILS.find((d) => d.slug === (DETAIL_SLUG[industry.slug] ?? industry.slug));
    return {
      key: industry.slug,
      name: industry.name,
      href: industry.href,
      image: industry.image.url || detail?.image || "",
      text: excerpt(detail?.description[0] ?? EXTRA_TEXT[industry.slug]),
    };
  });
}

export default async function IndustriesPage() {
  const industries = await getIndustryCards();

  return (
    <>
      <InnerBanner
        src="/assets/images/industries/industries-banner.webp"
        mobileSrc="/assets/images/industries/industries-banner-mobile.webp"
        alt="Industries"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Industries" />
        </div>
      </section>

      <section className="ind-list-section">
        <GearBackdrop className="ind-gear" />
        <div className="container">
          <div className="ind-list-intro" data-aos="fade-up">
            <h1>Industries We Serve</h1>
            <div className="ind-intro-underline" />
            <p>
              EWAC serves a wide range of industries including Steel, Cement, Mining, Power, Railways, Heavy
              Engineering, Oil &amp; Gas, and Infrastructure. Our advanced welding and wear protection solutions are
              designed to improve equipment life, enhance productivity, and reduce maintenance costs across demanding
              industrial applications.
            </p>
          </div>

          <div className="ind-list-grid">
            {industries.map((industry) => (
              <Link key={industry.key} href={industry.href} className="ind-list-card" data-aos="fade-up">
                <div className="ind-list-img">
                  {industry.image && <img src={industry.image} alt={industry.name} loading="lazy" />}
                </div>
                <div className="ind-list-body">
                  <h2 className="ind-list-name">{industry.name}</h2>
                  {industry.text && <p className="ind-list-text">{industry.text}</p>}
                  <span className="ind-list-more">
                    Explore <i className="fas fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
