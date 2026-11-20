import { fetchStrapi } from "@/lib/catalog";

// Shared SEO rules for every page. See docs/SEO.md.
//
// Order of priority for each tag:
//   1. the page's entry in Strapi → Page SEO (matched by `path`), or the page's own MetaSection
//      (blogs, contact, privacy policy)
//   2. the fallback written in the page file
//   3. the site defaults in src/app/layout.jsx

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ewacalloys.com";
export const SITE_NAME = "EWAC Alloys";
export const DEFAULT_OG_IMAGE = "/assets/images/about/about-banner.jpg";

/**
 * Turns a Strapi MetaSection (+ optional share image) into a Next.js metadata object.
 *
 * - `meta`: { MetaTitle, MetaDescription, MetaKeyword, MetaRobots } from Strapi, or null
 * - `fallback`: { title, description, robots, image } written in the page file
 * - `path`: the page URL (e.g. "/about-us/export"), used for the canonical link and og:url
 *
 * A MetaTitle from Strapi is used exactly as typed (editors write the full title); a fallback title gets
 * " | EWAC" added by the template in layout.jsx.
 */
export function toMetadata({ meta, image, fallback = {}, path }) {
  const title = meta?.MetaTitle ? { absolute: meta.MetaTitle } : fallback.title;
  const description = meta?.MetaDescription || fallback.description;
  const robots = meta?.MetaRobots || fallback.robots;
  const ogImage = image || fallback.image || DEFAULT_OG_IMAGE;
  // Share previews show the title without the template, so use the plain text.
  const ogTitle = meta?.MetaTitle || fallback.title;

  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(meta?.MetaKeyword && { keywords: meta.MetaKeyword }),
    ...(robots && { robots }),
    ...(path && { alternates: { canonical: path } }),
    // openGraph is replaced as a whole (not merged) with the layout's, so the site-wide fields are repeated here.
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      ...(ogTitle && { title: ogTitle }),
      ...(description && { description }),
      ...(path && { url: path }),
      images: [ogImage],
    },
  };
}

// Strapi media URLs can be absolute (http://<strapi>/uploads/…); keep only the path so the image is
// served from our own domain through the /uploads rewrite in next.config.mjs.
function mediaPath(media) {
  return media?.url ? media.url.replace(/^https?:\/\/[^/]+(?=\/uploads\/)/, "") : null;
}

/**
 * Meta tags for a page, editable in Strapi → Page SEO.
 * Usage in a page file:
 *   export const generateMetadata = () => getPageMeta("/about-us/export", { title: "Exports", description: "…" });
 * When there is no Strapi entry for the path (or Strapi is down), the fallback is used.
 */
export async function getPageMeta(path, fallback) {
  const [entry] = await fetchStrapi(`/api/page-template-seos?filters[path][$eq]=${path}&populate=*`);
  return toMetadata({ meta: entry?.MetaSection, image: mediaPath(entry?.OgImage), fallback, path });
}
