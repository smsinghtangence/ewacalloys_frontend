import { BLOG_POSTS } from "@/components/blogs/blogPosts";
import { fetchStrapi } from "@/lib/catalog";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getAttributes(entry) {
  return entry.attributes ?? entry;
}

function getPlainText(value) {
  if (typeof value === "string") {
    return value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(?:p|h[1-6]|li|div)>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .trim();
  }

  if (Array.isArray(value)) {
    return value.map(getPlainText).filter(Boolean).join("\n\n");
  }

  if (value && typeof value === "object") {
    return getPlainText(value.children ?? value.text ?? value.value ?? "");
  }

  return "";
}

function toContentBlocks(value) {
  if (Array.isArray(value)) {
    return value
      .map((block) => {
        const text = getPlainText(block);
        if (!text) return null;
        const type = ["heading", "h2", "h3"].includes(block?.type) ? "heading" : "text";
        return { type, text };
      })
      .filter(Boolean);
  }

  const content = getPlainText(value);
  if (!content) return [];

  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((text) => ({ type: "text", text }));
}

function getImageUrl(image) {
  if (typeof image === "string") return image;
  const media = image?.data?.attributes ?? image?.attributes ?? image?.data ?? image;
  return media?.url ?? "";
}

function normalizePost(entry) {
  if (!entry || typeof entry !== "object") return null;
  const fields = getAttributes(entry);
  const title = fields.Name ?? fields.name ?? fields.Title ?? fields.title;
  if (typeof title !== "string" || !title.trim()) return null;

  const fallback = BLOG_POSTS.find((post) => post.title === title.trim());
  const cmsSlug = fields.slug ?? fields.Slug;
  const slug = (typeof cmsSlug === "string" && cmsSlug.trim() ? slugify(cmsSlug) : fallback?.slug) || slugify(title);
  const content = fields.Content ?? fields.content ?? fields.Body ?? fields.body
    ?? fields.Article ?? fields.article ?? fields.Description ?? fields.description;
  const cmsBlocks = Array.isArray(fields.blocks) ? fields.blocks : Array.isArray(fields.Blocks) ? fields.Blocks : [];
  const contentBlocks = cmsBlocks.length
    ? cmsBlocks.map((block) => {
      if (!block || typeof block !== "object") return null;
      const text = getPlainText(block.html ?? block.text ?? block);
      return text ? { type: ["heading", "h2", "h3"].includes(block.type) ? "heading" : "text", text } : null;
    }).filter(Boolean)
    : toContentBlocks(content);
  const image = getImageUrl(fields.Image ?? fields.image ?? fields.Thumbnail ?? fields.thumbnail);
  const date = fields.publishedAt ?? fields.PublishedAt ?? fields.Date ?? fields.date ?? fallback?.date ?? "";
  const estimatedReadMinutes = Math.max(1, Math.ceil(contentBlocks.reduce((sum, block) => sum + block.text.split(/\s+/).length, 0) / 200));

  return {
    slug,
    title: title.trim(),
    image: image || fallback?.image || "/assets/images/blogs/blogs-banner.webp",
    date: typeof date === "string" ? date.slice(0, 10) : "",
    readMinutes: Number(fields.readMinutes ?? fields.ReadMinutes) || fallback?.readMinutes || estimatedReadMinutes,
    blocks: contentBlocks.length ? contentBlocks : fallback?.blocks ?? [],
  };
}

export async function getBlogPosts() {
  const entries = await fetchStrapi("/api/blog-posts?populate=Image&sort=order");
  const cmsPosts = entries.map(normalizePost).filter(Boolean);

  return cmsPosts.length
    ? cmsPosts
    : BLOG_POSTS.map((post) => ({ ...post }));
}

export async function getBlogPost(slug) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
