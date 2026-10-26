import Link from "next/link";
import { notFound } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import IndustryApplications from "@/components/industries/IndustryApplications";
import { INDUSTRY_DETAILS } from "@/components/industries/industryDetails";
import { getIndustries } from "@/lib/catalog";

// The header menu (Strapi) uses "oil-and-gas-refineries"; the live site URL is "oil-gas-refineries". Serve both.
const SLUG_ALIASES = { "oil-and-gas-refineries": "oil-gas-refineries" };

function findIndustry(slug) {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return INDUSTRY_DETAILS.find((industry) => industry.slug === canonical);
}

export function generateStaticParams() {
  return [...INDUSTRY_DETAILS.map((i) => i.slug), ...Object.keys(SLUG_ALIASES)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  return industry
    ? { title: `${industry.name} | Industries | EWAC`, description: industry.description[0]?.slice(0, 160) }
    : {};
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  // Prefer the photo managed in Strapi; fall back to the one scraped from the old site.
  const strapiIndustries = await getIndustries();
  const strapiMatch = strapiIndustries.find((i) => i.slug === slug || i.slug === industry.slug || i.name === industry.name);
  const heroImage = strapiMatch?.image.url || industry.image;

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
          <Breadcrumb current={industry.name} trail={[{ label: "Industries", href: "/our_industries/steel" }]} />
        </div>
      </section>

      <section className="ind-tabs-section">
        <div className="container">
          <nav className="ind-tabs" aria-label="Industries">
            <span className="ind-tabs-label">Industries</span>
            {INDUSTRY_DETAILS.map((item) => (
              <Link
                key={item.slug}
                href={`/our_industries/${item.slug}`}
                className={item.slug === industry.slug ? "active" : ""}
                aria-current={item.slug === industry.slug ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="ind-intro">
        <GearBackdrop className="ind-gear" />
        <div className="container">
          <div className="ind-intro-row">
            <div className="ind-intro-left" data-aos="fade-right">
              <h1>{industry.name}</h1>
              <div className="ind-intro-underline" />
              <div className="ind-intro-panel">
                {industry.description.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
            {heroImage && (
              <div className="ind-intro-img" data-aos="fade-left">
                <img src={heroImage} alt={industry.name} />
              </div>
            )}
          </div>
        </div>
      </section>

      <IndustryApplications applications={industry.applications} />

      <ConsultCta welderDecoration />
    </>
  );
}
