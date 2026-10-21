import { fetchStrapi, resolveImage } from "@/lib/catalog";
import type { UniSliderCard } from "@/components/home/UniSlider";

type RawInsightEntry = {
  id: number;
  Name: string;
  slug: string;
  Image?: { url: string; name?: string } | null;
};

function toCards(entries: RawInsightEntry[]): UniSliderCard[] {
  return entries.map((entry) => ({
    image: resolveImage(entry.Image, entry.Name).url,
    title: entry.Name,
  }));
}

export async function getBlogPostCards(): Promise<UniSliderCard[]> {
  const data = (await fetchStrapi(
    "/api/blog-posts?populate=Image&sort=order"
  )) as RawInsightEntry[];
  return toCards(data);
}

export async function getNewsArticleCards(): Promise<UniSliderCard[]> {
  const data = (await fetchStrapi(
    "/api/news-articles?populate=Image&sort=order"
  )) as RawInsightEntry[];
  return toCards(data);
}

export async function getCaseStudyCards(): Promise<UniSliderCard[]> {
  const data = (await fetchStrapi(
    "/api/case-studies?populate=Image&sort=order"
  )) as RawInsightEntry[];
  return toCards(data);
}
