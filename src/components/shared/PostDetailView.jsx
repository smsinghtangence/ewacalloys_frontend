import Link from "next/link";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import BlogDetailContent from "@/components/blogs/BlogDetailContent";

// Dates are stored as YYYY-MM-DD; format in UTC so the day never shifts with the server's timezone.
function formatDate(iso, month, day) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { month, day, year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

const TOPICS = [
  { label: "Steel", slug: "steel" },
  { label: "Cement", slug: "cement" },
  { label: "Power", slug: "power" },
  { label: "Sugar", slug: "sugar" },
  { label: "Mining", slug: "mining" },
  { label: "Oil & Gas Refineries", slug: "oil-gas-refineries" },
  { label: "Tyre", slug: "tyre" },
  { label: "Port", slug: "port" },
  { label: "Road Transport", slug: "road-transport" },
  { label: "Railways", href: "/our_services/railways" },
];

/**
 * Detail page shared by Blogs, News and Case Studies.
 * post: { slug, title, image, date, readMinutes, description, blocks }
 * section: { label, href, backLabel, banner: { src, mobileSrc } } — e.g. Blogs → /blogs
 * related: up to 3 posts of the same section (the section is hidden when empty).
 */
export default function PostDetailView({ post, section, related = [], showTopics = true }) {
  return (
    <>
      <InnerBanner
        src={section.banner.src}
        mobileSrc={section.banner.mobileSrc}
        alt={section.label}
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current={post.title} trail={[{ label: section.label, href: section.href }]} />
        </div>
      </section>

      <section className="blog-detail-section">
        <GearBackdrop className="blog-detail-gear" />
        <div className="container">
          <Link href={section.href} className="blog-detail-back">
            <i className="fas fa-arrow-left" /> {section.backLabel}
          </Link>

          <article>
            <header className="blog-article-header">
              <div className="blog-article-heading">
                <h1 className="blog-detail-title">{post.title}</h1>
                <div className="blog-detail-meta">
                  <span><time dateTime={post.date}>{formatDate(post.date, "long", "numeric")}</time></span>
                  <span>{post.readMinutes} min read</span>
                </div>
              </div>
              <div className="blog-article-hero">
                <img src={post.image} alt={post.title} />
              </div>
            </header>

            <BlogDetailContent blocks={post.blocks} title={post.title} />
          </article>

          {related.length > 0 && (
            <section className="blog-related-section" id="related-articles" aria-labelledby="related-articles-title">
              <div className="blog-related-heading">
                <div>
                  <span className="blog-related-eyebrow">Keep exploring</span>
                  <h2 id="related-articles-title">Related {section.label}</h2>
                </div>
                <Link href={section.href}>
                  View all {section.label.toLowerCase()} <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
              <div className="blog-related-grid">
                {related.slice(0, 3).map((item) => {
                  const excerpt = item.description ?? "";
                  return (
                    <Link className="blog-related-card" href={`${section.href}/${item.slug}`} key={item.slug}>
                      <div className="blog-related-image"><img src={item.image} alt="" loading="lazy" /></div>
                      <div className="blog-related-card-body">
                        <div className="blog-related-meta">
                          <span><time dateTime={item.date}>{formatDate(item.date, "short", "2-digit")}</time></span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{excerpt.slice(0, 132)}{excerpt.length > 132 ? "…" : ""}</p>
                        <span className="blog-related-read">{item.readMinutes} min read <i className="fas fa-arrow-right" aria-hidden="true" /></span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {showTopics && (
            <section className="blog-topics-section" aria-labelledby="blog-topics-title">
              <h2 id="blog-topics-title">More Topics</h2>
              <div className="blog-topic-links">
                {TOPICS.map((item) => (
                  <Link
                    href={item.href ?? `/our_industries/${item.slug}`}
                    className="blog-topic-link"
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
