import Link from "next/link";
import { notFound } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import { BLOG_POSTS } from "@/components/blogs/blogPosts";

const AUTHOR = "enquiry@ewacalloys.com";

// Dates are stored as YYYY-MM-DD; format in UTC so the day never shifts with the server's timezone.
function formatDate(iso, month, day) {
  return new Intl.DateTimeFormat("en-US", { month, day, year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const firstParagraph = post.blocks.find((b) => b.type === "html")?.html.replace(/<[^>]+>/g, "") ?? "";
  return { title: `${post.title} | EWAC`, description: firstParagraph.slice(0, 160) };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const latest = [...BLOG_POSTS]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

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

          <div className="blog-detail-layout">
            <article className="blog-detail-main">
              <div className="blog-detail-hero" data-aos="fade-up">
                <img src={post.image} alt={post.title} />
              </div>

              <h1 className="blog-detail-title">{post.title}</h1>
              <div className="blog-detail-meta">
                <span>
                  By <strong>{AUTHOR}</strong>
                </span>
                <span>{formatDate(post.date, "long", "numeric")}</span>
                <span>{post.readMinutes} min read</span>
              </div>

              <div className="blog-detail-content">
                {post.blocks.map((block, index) =>
                  block.type === "h2" ? (
                    <h2 key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
                  ) : (
                    <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
                  )
                )}
              </div>
            </article>

            <aside className="blog-detail-sidebar">
              <h3>Latest Posts</h3>
              <ul>
                {latest.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blogs/${item.slug}`}>
                      <img src={item.image} alt="" />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{formatDate(item.date, "short", "2-digit")}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
