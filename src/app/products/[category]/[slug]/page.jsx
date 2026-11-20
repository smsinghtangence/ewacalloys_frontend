import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageMeta, toMetadata } from "@/lib/seo";
import { fetchStrapi } from "@/lib/catalog";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import { ProductGallery, ProductTabs } from "@/components/products/ProductDetailView";
import { PRODUCT_DETAILS } from "@/components/products/productDetails";
import { PRODUCTS } from "@/components/products/productsData";
import CareKitDetail from "@/components/products/CareKitDetail";
import { CUSTOM_PRODUCT_PAGES } from "@/components/products/careKit";

export const revalidate = 60;

// Strapi media URLs can be absolute (http://<strapi>/uploads/…); keep only the path so images load through
// the /uploads rewrite in next.config.mjs.
const mediaUrl = (media) => (media?.url ? media.url.replace(/^https?:\/\/[^/]+(?=\/uploads\/)/, "") : null);
const texts = (items) => (items ?? []).map((item) => item.Text).filter(Boolean);

// The product as entered in Strapi → Product. The custom product controller populates every field this page
// needs; populate=* covers a server still running the default controller (images and components).
async function getStrapiProduct(slug) {
  const [product] = await fetchStrapi(`/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  if (!product) return null;

  const images = [...(product.Gallery ?? []).map(mediaUrl), mediaUrl(product.Image)].filter(Boolean);
  return {
    // false while the product has no detail content (Features) in Strapi yet
    hasDetails: Boolean(product.Features?.length),
    slug: product.slug,
    category: product.category?.slug,
    name: product.Name,
    subtitle: product.Subtitle || "",
    bestSeller: Boolean(product.BestSeller),
    images: [...new Set(images)],
    applicationImage: mediaUrl(product.ApplicationImage),
    wheel: mediaUrl(product.WheelImage),
    application: product.Application || "",
    features: texts(product.Features),
    recommendations: texts(product.Recommendations),
    hardness: texts(product.Hardness),
    amperage: (product.Amperage ?? []).map((row) => ({ size: row.Size, amps: row.Amperage })),
    brochure: mediaUrl(product.Brochure),
    meta: product.MetaSection?.[0] ?? null,
  };
}

// 1. Strapi product with details  2. placeholder data below  3. Strapi product with just its name/image
// (so every product listed in Strapi has a page instead of a 404).
async function getProduct(slug) {
  const strapiProduct = await getStrapiProduct(slug);
  if (strapiProduct?.hasDetails) return strapiProduct;
  return findProduct(slug) ?? strapiProduct;
}

// Products with their own entry in productDetails.js use it; any other catalogue product reuses the first
// entry as a template until its real details are added.
function findProduct(slug) {
  const detail = PRODUCT_DETAILS.find((product) => product.slug === slug);
  if (detail) return detail;
  const listed = PRODUCTS.find((product) => product.slug === slug);
  if (!listed) return null;
  return {
    ...PRODUCT_DETAILS[0],
    slug: listed.slug,
    category: listed.category,
    name: listed.name,
    subtitle: listed.type,
    bestSeller: Boolean(listed.bestSeller),
    images: [listed.image, ...PRODUCT_DETAILS[0].images],
  };
}

export function generateStaticParams() {
  return [
    ...PRODUCT_DETAILS.map(({ category, slug }) => ({ category, slug })),
    ...Object.values(CUSTOM_PRODUCT_PAGES).map(({ category, slug }) => ({ category, slug })),
  ];
}

// Meta description: the product's application text, or a sentence built from its name, type and category.
function describeProduct(product, category) {
  const plain = (product.application || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length >= 80) return plain.length > 158 ? `${plain.slice(0, 155).replace(/\s+\S*$/, "")}…` : plain;
  const range = category.replace(/-/g, " ").replace(/\band\b/g, "&");
  const type = product.subtitle ? ` (${product.subtitle})` : "";
  return `${product.name}${type} from EWAC Alloys' ${range} range. Contact our team for specifications, sizes and application advice.`;
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const custom = CUSTOM_PRODUCT_PAGES[slug];
  if (custom) {
    if (custom.category !== category) return {};
    return getPageMeta(`/products/${category}/${slug}`, {
      title: `${custom.name} | Products`,
      description: custom.metaDescription,
      image: custom.heroImage.src,
    });
  }
  const product = await getProduct(slug);
  if (!product) return {};
  const description = describeProduct(product, category);
  const fallback = { title: `${product.name} | Products`, description };
  // The product's own MetaSection in Strapi wins; otherwise Page SEO / the fallback.
  if (product.meta) {
    return toMetadata({ meta: product.meta, image: product.images[0], fallback, path: `/products/${category}/${slug}` });
  }
  return getPageMeta(`/products/${category}/${slug}`, fallback);
}

export default async function ProductDetailPage({ params }) {
  const { category, slug } = await params;
  // A few products (e.g. the EWAC Care Kit) have a page with their own layout; every other product uses the one below.
  const custom = CUSTOM_PRODUCT_PAGES[slug];
  if (custom) {
    if (custom.category !== category) notFound();
    return <CareKitDetail kit={custom} />;
  }
  const product = await getProduct(slug);
  if (!product) notFound();
  const hasNoDetails =
    !product.application && !product.features.length && !product.recommendations.length && !product.hardness.length;

  return (
    <>
      <InnerBanner
        src="/assets/images/product-detail/product-banner.webp"
        mobileSrc="/assets/images/product-detail/product-banner-mobile.webp"
        alt="Product Description"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current={product.name} trail={[{ label: "Products", href: "/products" }]} />
        </div>
      </section>

      <section className="pd-section">
        <GearBackdrop className="pd-gear" />
        <div className="container">
          <div className="pd-grid">
            <div className="pd-left">
              {product.images.length > 0 && <ProductGallery images={product.images} name={product.name} />}

              {product.wheel && (
                <div className="pd-wheel">
                  <img src={product.wheel} alt="Wear resistance ratings" />
                </div>
              )}
            </div>

            <div className="pd-right">
              {product.bestSeller && <span className="pd-badge">Best Seller</span>}
              <h1 className="pd-title">{product.name}</h1>
              {product.subtitle && (
                <div className="pd-subtitle">
                  <p>{product.subtitle}</p>
                </div>
              )}

              {product.applicationImage && (
                <div className="pd-app-img">
                  <img src={product.applicationImage} alt={`${product.name} application`} />
                </div>
              )}

              {product.application && (
                <>
                  <h2 className="pd-heading">Typical Application</h2>
                  <div className="pd-text">
                    <p>{product.application}</p>
                  </div>
                </>
              )}

              {hasNoDetails && (
                <div className="pd-text">
                  <p>
                    Detailed specifications for this product will be added soon. For technical data, pricing or
                    a recommendation for your application, please <Link href="/contact-us">contact our team</Link>.
                  </p>
                </div>
              )}

              {(product.features.length > 0 || product.recommendations.length > 0) && (
                <ProductTabs features={product.features} recommendations={product.recommendations} />
              )}

              {(product.hardness.length > 0 || product.amperage.length > 0) && (
              <div className="pd-tables">
                {product.hardness.length > 0 && (
                <table className="pd-table pd-hardness">
                  <thead>
                    <tr>
                      <th>Hardness</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.hardness.map((row) => (
                      <tr key={row}>
                        <td>{row}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}

                {product.amperage.length > 0 && (
                <table className="pd-table pd-amperage">
                  <thead>
                    <tr>
                      <th colSpan={2} className="pd-amperage-head">
                        Recommended Amperage
                      </th>
                    </tr>
                    <tr className="pd-amperage-cols">
                      <th>Size (mm)</th>
                      <th>Amperage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.amperage.map((row) => (
                      <tr key={row.size}>
                        <td>{row.size}</td>
                        <td>{row.amps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
              )}

              {product.brochure && product.brochure !== "#" && (
                <a href={product.brochure} className="pd-btn" target="_blank" rel="noopener noreferrer" download>
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
