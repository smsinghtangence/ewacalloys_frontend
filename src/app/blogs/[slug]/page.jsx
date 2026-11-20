import { notFound } from "next/navigation";
import PostDetailView from "@/components/shared/PostDetailView";
import { fetchStrapi } from "@/lib/catalog";
import { toMetadata } from "@/lib/seo";

export const revalidate = 60;
export const dynamicParams = true;

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
  // The blog's own MetaSection wins; otherwise its heading + excerpt (src/lib/seo.js).
  // A MetaTitle that is only the company name (e.g. "EWAC Alloys Limited") is ignored so the article title is used.
  const genericTitle = /^\s*ewac( alloys)?( limited)?\s*$/i.test(post.meta?.MetaTitle ?? "");
  return toMetadata({
    meta: genericTitle ? { ...post.meta, MetaTitle: null } : post.meta,
    image: post.image,
    fallback: { title: post.title, description: post.description },
    path: `/blogs/${slug}`,
  });
}

const SECTION = {
  label: "Blogs",
  href: "/blogs",
  backLabel: "Back to Blog",
  banner: { src: "/assets/images/blogs/blogs-banner.webp", mobileSrc: "/assets/images/blogs/blogs-banner-mobile.webp" },
};

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Only the articles picked in Strapi; the section is hidden when none are picked.
  return <PostDetailView post={post} section={SECTION} related={post.relatedArticles} />;
}
