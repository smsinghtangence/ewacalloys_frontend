import Link from "next/link";
import { notFound } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import BlogDetailContent from "@/components/blogs/BlogDetailContent";
import { fetchStrapi } from "@/lib/catalog";

export const revalidate = 60;
export const dynamicParams = true;

// Dates are stored as YYYY-MM-DD; format in UTC so the day never shifts with the server's timezone.
function formatDate(iso, month, day) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { month, day, year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

// Turns a Strapi blog into what this page shows. Images in the article are made relative so they load through
// the /uploads rewrite in next.config.mjs, and the HTML is split at each <h2> for the "In This Article" list.
function toPost(blog) {
  const html = (blog.Content ?? "").replace(/https?:\/\/[^\s"'/]+\/uploads\//g, "/uploads/");
  const blocks = [];
  let last = 0;
  for (const match of html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)) {
    const before = html.slice(last, match.index).trim();
    if (before) blocks.push({ type: "html", html: before });
    blocks.push({ type: "h2", html: match[1].trim() });
    last = match.index + match[0].length;
  }
  if (html.slice(last).trim()) blocks.push({ type: "html", html: html.slice(last).trim() });

  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const meta = blog.MetaSection?.[0] ?? {};
  return {
    meta,
    slug: blog.slug,
    title: blog.Heading,
    image: html.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "/assets/images/blogs/blogs-banner.webp",
    date: blog.Date || (blog.publishedAt ?? "").slice(0, 10),
    readMinutes: blog.ReadTime || Math.max(1, Math.ceil(text.split(" ").length / 200)),
    description: blog.Excerpt || text.slice(0, 160),
    blocks,
  };
}

async function getPost(slug) {
  // Get the blog with this slug. populate=* also returns its SEO fields (MetaSection) and related_articles.
  const blogs = await fetchStrapi(`/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
  const blog = blogs[0];

  if (!blog) return null;
  // Related articles are picked per blog in Strapi; populate=* returns their own fields, which is all a card needs.
  const relatedArticles = (blog.related_articles ?? []).filter((item) => item.slug).map(toPost);
  return { ...toPost(blog), relatedArticles };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const { MetaTitle, MetaDescription, MetaKeyword, MetaRobots } = post.meta;
  return {
    title: MetaTitle || `${post.title} | EWAC`,
    description: MetaDescription || post.description,
    ...(MetaKeyword && { keywords: MetaKeyword }),
    ...(MetaRobots && { robots: MetaRobots }),
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Only the articles picked in Strapi; the section is hidden when none are picked.
  const related = post.relatedArticles.slice(0, 3);
  const topics = [
    { label: "Steel", slug: "steel" },
    { label: "Cement", slug: "cement" },
    { label: "Power", slug: "power" },
    { label: "Sugar", slug: "sugar" },
    { label: "Mining", slug: "mining" },
    { label: "Oil & Gas Refineries", slug: "oil-gas-refineries" },
    { label: "Tyre", slug: "tyre" },
    { label: "Port", slug: "port" },
    { label: "Road Transport", slug: "road-transport" },
    { label: "Railways", slug: "railways", unavailable: true },
  ];

  return (
    <>
      <InnerBanner
        src="/assets/images/blogs/blogs-banner.webp"
        mobileSrc="/assets/images/blogs/blogs-banner-mobile.webp"
        alt="Blogs"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current={post.title} trail={[{ label: "Blogs", href: "/blogs" }]} />
        </div>
      </section>

      <section className="blog-detail-section">
        <GearBackdrop className="blog-detail-gear" />
        <div className="container">
          <Link href="/blogs" className="blog-detail-back">
            <i className="fas fa-arrow-left" /> Back to Blog
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
                <h2 id="related-articles-title">Related Articles</h2>
              </div>
              <Link href="/blogs">View all articles <i className="fas fa-arrow-right" aria-hidden="true" /></Link>
            </div>
            <div className="blog-related-grid">
              {related.map((item) => {
                const excerpt = item.description;
                return (
                  <Link className="blog-related-card" href={`/blogs/${item.slug}`} key={item.slug}>
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

          <section className="blog-topics-section" aria-labelledby="blog-topics-title">
            <h2 id="blog-topics-title">More Topics</h2>
            <div className="blog-topic-links">
              {topics.map((item) => {
                const className = "blog-topic-link";
                return item.unavailable ? (
                  <span className={className} key={item.slug} aria-disabled="true">{item.label}</span>
                ) : (
                  <Link
                    href={`/our_industries/${item.slug}`}
                    className={className}
                    key={item.slug}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
