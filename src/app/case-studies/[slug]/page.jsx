import { notFound } from "next/navigation";
import PostDetailView from "@/components/shared/PostDetailView";
import { CASE_STUDY_POSTS } from "@/components/insights/dummyPosts";
import { toMetadata } from "@/lib/seo";

// DUMMY CONTENT for now — the posts live in src/components/insights/dummyPosts.js.
const SECTION = {
  label: "Case Studies",
  href: "/case-studies",
  backLabel: "Back to Case Studies",
  banner: { src: "/assets/images/blogs/case-studies-banner.webp", mobileSrc: "/assets/images/blogs/case-studies-banner-mobile.webp" },
};

const findPost = (slug) => CASE_STUDY_POSTS.find((item) => item.slug === slug);

export function generateStaticParams() {
  return CASE_STUDY_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return toMetadata({
    meta: {},
    image: post.image,
    fallback: { title: post.title, description: post.description },
    path: `/case-studies/${slug}`,
  });
}

export default async function DetailPage({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  // Related: the other posts of this section, newest first.
  const related = CASE_STUDY_POSTS.filter((item) => item.slug !== slug).slice(0, 3);
  return <PostDetailView post={post} section={SECTION} related={related} />;
}
