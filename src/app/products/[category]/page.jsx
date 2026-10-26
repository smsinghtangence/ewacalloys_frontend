import { notFound } from "next/navigation";
import ProductsPageView from "@/components/products/ProductsPageView";
import { getProductCategories } from "@/lib/catalog";

async function findCategory(slug) {
  const categories = await getProductCategories();
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const found = await findCategory(category);
  return found ? { title: `${found.name} | Products | EWAC` } : {};
}

export default async function ProductCategoryPage({ params }) {
  const { category } = await params;
  const found = await findCategory(category);
  if (!found) notFound();
  return <ProductsPageView category={{ slug: found.slug, name: found.name }} />;
}
