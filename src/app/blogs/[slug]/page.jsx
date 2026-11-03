import Link from "next/link";
import { notFound } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import BlogDetailContent from "@/components/blogs/BlogDetailContent";
import { getBlogPost, getBlogPosts } from "@/lib/blogs";

export const revalidate = 60;
export const dynamicParams = true;

// Dates are stored as YYYY-MM-DD; format in UTC so the day never shifts with the server's timezone.
function formatDate(iso, month, day) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { month, day, year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

function getPostDescription(post) {
  const intro = post.blocks.find((block) => block.type === "html" || block.type === "text");
  const text = intro?.text ?? intro?.html?.replace(/<[^>]+>/g, "") ?? "";
  return text.slice(0, 160);
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} | EWAC`, description: getPostDescription(post) };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const candidates = [...posts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date));
  const related = candidates.slice(0, 3);
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
                const excerpt = getPostDescription(item);
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
