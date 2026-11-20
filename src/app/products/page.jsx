import ProductsPageView from "@/components/products/ProductsPageView";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/products").
export const generateMetadata = () => getPageMeta("/products", {
  title: "Products",
  description: "Explore EWAC Alloys products: maintenance and repair welding consumables, fabrication products, wear liners, ceramic liners and welding equipment.",
});

export default function ProductsPage() {
  return <ProductsPageView />;
}
