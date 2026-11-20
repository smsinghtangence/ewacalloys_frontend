import { notFound } from "next/navigation";
import ProductsPageView from "@/components/products/ProductsPageView";
import { getProductCategories } from "@/lib/catalog";
import { getPageMeta } from "@/lib/seo";

async function findCategory(slug) {
  const categories = await getProductCategories();
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const found = await findCategory(category);
  if (!found) return {};
  return getPageMeta(`/products/${found.slug}`, {
    title: `${found.name} | Products`,
    description: `${found.name} from EWAC Alloys: welding, brazing, wear and thermal spray products for maintenance and repair.`,
  });
}

export default async function ProductCategoryPage({ params }) {
  const { category } = await params;
  const found = await findCategory(category);
  if (!found) notFound();
  return <ProductsPageView category={{ slug: found.slug, name: found.name }} />;
}
