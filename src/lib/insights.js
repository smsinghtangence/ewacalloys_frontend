import { fetchStrapi } from "@/lib/catalog";
import { NEWS_POST_CARDS, CASE_STUDY_POST_CARDS } from "@/components/insights/dummyPosts";

// Homepage Blogs slider: the 9 newest published blogs (same as the Insights page); each card uses the
// first photo in the article and links to its detail page.
export async function getBlogPostCards() {
  const blogs = await fetchStrapi("/api/blogs?filters[slug][$notNull]=true&sort=publishedAt:desc&pagination[pageSize]=9");
  return blogs.map((blog) => ({
    image:
      blog.Content?.match(/<img[^>]+src="(?:https?:\/\/[^/"]+)?(\/uploads\/[^"]+)"/i)?.[1] ??
      "/assets/images/blogs/blogs-banner.webp",
    title: blog.Heading,
    href: `/blogs/${blog.slug}`,
  }));
}

// News and Case Studies use the dummy posts for now (src/components/insights/dummyPosts.js), the same ones the
// /news and /case-studies pages list, so every card opens its detail page. Switch these to Strapi once the
// News Article / Case Study collections have real content and detail pages read from Strapi.
export async function getNewsArticleCards() {
  return NEWS_POST_CARDS;
}

export async function getCaseStudyCards() {
  return CASE_STUDY_POST_CARDS;
}
