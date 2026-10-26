import { fetchStrapi, resolveImage } from "@/lib/catalog";
import { BLOG_CARDS, NEWS_CARDS, CASE_STUDY_CARDS } from "@/components/home/uniSliderData";

// Cards come from Strapi; when it returns nothing (or isn't reachable) the built-in cards are used.
function toCards(entries, fallback) {
  if (!entries.length) return fallback;
  return entries.map((entry) => ({
    image: resolveImage(entry.Image, entry.Name).url,
    title: entry.Name,
  }));
}

export async function getBlogPostCards() {
  const data = (await fetchStrapi(
    "/api/blog-posts?populate=Image&sort=order"
  ));
  return toCards(data, BLOG_CARDS);
}

export async function getNewsArticleCards() {
  const data = (await fetchStrapi(
    "/api/news-articles?populate=Image&sort=order"
  ));
  return toCards(data, NEWS_CARDS);
}

export async function getCaseStudyCards() {
  const data = (await fetchStrapi(
    "/api/case-studies?populate=Image&sort=order"
  ));
  return toCards(data, CASE_STUDY_CARDS);
}
