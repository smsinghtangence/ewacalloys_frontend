import { notFound } from "next/navigation";
import PostDetailView from "@/components/shared/PostDetailView";
import { NEWS_POSTS } from "@/components/insights/dummyPosts";
import { toMetadata } from "@/lib/seo";

// DUMMY CONTENT for now — the posts live in src/components/insights/dummyPosts.js.
const SECTION = {
  label: "News",
  href: "/news",
  backLabel: "Back to News",
  banner: { src: "/assets/images/blogs/news-banner.webp", mobileSrc: "/assets/images/blogs/news-banner-mobile.webp" },
};

const findPost = (slug) => NEWS_POSTS.find((item) => item.slug === slug);

export function generateStaticParams() {
  return NEWS_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return toMetadata({
    meta: {},
    image: post.image,
    fallback: { title: post.title, description: post.description },
    path: `/news/${slug}`,
  });
}

export default async function DetailPage({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  // Related: the other posts of this section, newest first.
  const related = NEWS_POSTS.filter((item) => item.slug !== slug).slice(0, 3);
  return <PostDetailView post={post} section={SECTION} related={related} showTopics={false} />;
}
