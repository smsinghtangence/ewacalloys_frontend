import ProductsPageView from "@/components/products/ProductsPageView";
import { getPageMeta } from "@/lib/seo";
import { getProducts } from "@/lib/catalog";

// Rebuild at most every 60 s, so a build made while Strapi was down fills in later.
export const revalidate = 60;

// Title, description and robots come from Strapi → Page SEO (path "/products").
export const generateMetadata = () => getPageMeta("/products", {
  title: "Products",
  description: "Explore EWAC Alloys products: maintenance and repair welding consumables, fabrication products, wear liners, ceramic liners and welding equipment.",
});

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsPageView products={products} />;
}
