import { fetchStrapi, resolveImage } from "@/lib/catalog";

function toCards(entries) {
  return entries.map((entry) => ({
    image: resolveImage(entry.Image, entry.Name).url,
    title: entry.Name,
  }));
}

export async function getBlogPostCards() {
  const data = (await fetchStrapi(
    "/api/blog-posts?populate=Image&sort=order"
  ));
  return toCards(data);
}

export async function getNewsArticleCards() {
  const data = (await fetchStrapi(
    "/api/news-articles?populate=Image&sort=order"
  ));
  return toCards(data);
}

export async function getCaseStudyCards() {
  const data = (await fetchStrapi(
    "/api/case-studies?populate=Image&sort=order"
  ));
  return toCards(data);
}
