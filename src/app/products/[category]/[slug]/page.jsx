import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPageMeta, toMetadata } from "@/lib/seo";
import { fetchStrapiRequired, PRODUCT_PLACEHOLDER } from "@/lib/catalog";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import { ProductGallery, ProductTabs } from "@/components/products/ProductDetailView";
import CareKitDetail from "@/components/products/CareKitDetail";
import { CUSTOM_PRODUCT_PAGES } from "@/components/products/careKit";

export const revalidate = 60;

// Strapi media URLs can be absolute (http://<strapi>/uploads/…); keep only the path so images load through
// the /uploads rewrite in next.config.mjs.
const mediaUrl = (media) => (media?.url ? media.url.replace(/^https?:\/\/[^/]+(?=\/uploads\/)/, "") : null);
const texts = (items) => (items ?? []).map((item) => item.Text).filter(Boolean);
const cells = (line) => line.split("|").map((cell) => cell.trim());

// Amperage is stored as text: one row per line, cells separated by "|", first line is the header.
function parseTable(text) {
  const [head, ...rows] = (text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return head ? { head: cells(head), rows: rows.map(cells) } : null;
}

async function getProduct(slug) {
  const { data } = await fetchStrapiRequired(
    `/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  const [product] = data;
  if (!product) return null;

  const photos = [...(product.Gallery ?? []).map(mediaUrl), mediaUrl(product.Image)].filter(Boolean);
  const applicationImage = mediaUrl(product.ApplicationImage);
  // Without a product photo, the application photo becomes the main picture (and is not repeated below).
  const images = photos.length ? photos : [applicationImage].filter(Boolean);
  return {
    slug: product.slug,
    category: product.mainCategory?.slug || "",
    categoryName: product.mainCategory?.Name || "",
    subCategory: product.subCategory?.Name || "",
    productCategory: product.category?.Name || "",
    type: product.ProductType || "",
    process: product.Process || "",
    brand: product.Brand || "",
    name: product.Name,
    subtitle: product.Subtitle || "",
    bestSeller: Boolean(product.BestSeller),
    images: [...new Set(images)],
    applicationImage,
    wheel: mediaUrl(product.WheelImage),
    application: product.Application || "",
    features: texts(product.Features),
    recommendations: texts(product.Recommendations),
    hardness: texts(product.Hardness),
    amperage: parseTable(product.Amperage),
    meta: product.MetaSection?.[0] ?? null,
  };
}

// DUMMY CONTENT — lorem ipsum shown in place of missing product content so the layout can be reviewed.
// Applied only when rendering the page (never in metadata). Set to false before launch.
const SHOW_DUMMY_CONTENT = true;
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const DUMMY = {
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  wheel: "/assets/images/product-detail/te-101-wheel.webp", // the design's sample wear-rating wheel
  application: `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
  features: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore.",
    "Ut enim ad minim veniam, quis nostrud exercitation.",
    "Duis aute irure dolor in reprehenderit in voluptate.",
  ],
  recommendations: [LOREM, "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  hardness: ["Lorem ipsum 20 - 24 HRC", "Dolor sit 35 - 48 HRC"],
  amperage: { head: ["Size (mm)", "Range"], rows: [["3.15", "100 - 120"], ["4.00", "130 - 160"], ["5.00", "150 - 180"]] },
};

function withDummyContent(product) {
  if (!SHOW_DUMMY_CONTENT) return product;
  return {
    ...product,
    subtitle: product.subtitle || DUMMY.subtitle,
    applicationImage: product.applicationImage || PRODUCT_PLACEHOLDER,
    wheel: product.wheel || DUMMY.wheel,
    wheelIsDemo: !product.wheel,
    application: product.application || DUMMY.application,
    features: product.features.length ? product.features : DUMMY.features,
    recommendations: product.recommendations.length ? product.recommendations : DUMMY.recommendations,
    hardness: product.hardness.length ? product.hardness : DUMMY.hardness,
    amperage: product.amperage || DUMMY.amperage,
  };
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
  if (!product || product.category !== category) return {};
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
  // A product opened under another category (e.g. /products/view/<slug> from the Strapi "Open" button)
  // is sent to its real URL.
  const custom = CUSTOM_PRODUCT_PAGES[slug];
  if (custom) {
    if (custom.category !== category) redirect(`/products/${custom.category}/${slug}`);
    return <CareKitDetail kit={custom} />;
  }
  const found = await getProduct(slug);
  if (!found || !found.category) notFound();
  if (found.category !== category) redirect(`/products/${found.category}/${slug}`);
  const product = withDummyContent(found);
  const hasNoDetails =
    !product.application && !product.features.length && !product.recommendations.length &&
    !product.hardness.length && !product.amperage;

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
          <Breadcrumb
            current={product.name}
            trail={[
              { label: "Products", href: "/products" },
              ...(product.categoryName ? [{ label: product.categoryName, href: `/products/${product.category}` }] : []),
            ]}
          />
        </div>
      </section>

      <section className="pd-section">
        <GearBackdrop className="pd-gear" />
        <div className="container">
          <div className="pd-grid">
            <div className="pd-left">
              {/* No photos yet: a greyed demo slider with three placeholder slides keeps the layout. */}
              <ProductGallery
                images={product.images.length > 0 ? product.images : Array(3).fill(PRODUCT_PLACEHOLDER)}
                name={product.name}
                demo={product.images.length === 0}
              />

              {product.wheel && (
                <div className={`pd-wheel${product.wheelIsDemo ? " pd-wheel--demo" : ""}`}>
                  <img src={product.wheel} alt={product.wheelIsDemo ? "Sample wear resistance ratings" : "Wear resistance ratings"} />
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

              {(product.hardness.length > 0 || product.amperage) && (
              <div className="pd-tables">
                {product.hardness.length > 0 && (
                <table className="pd-table pd-hardness">
                  <thead>
                    <tr>
                      <th>Hardness</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.hardness.map((row, index) => (
                      <tr key={`${row}-${index}`}>
                        <td>{row}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}

                {product.amperage && (
                <table className="pd-table pd-amperage">
                  <thead>
                    <tr>
                      <th colSpan={product.amperage.head.length} className="pd-amperage-head">
                        Recommended Amperage
                      </th>
                    </tr>
                    <tr className="pd-amperage-cols">
                      {product.amperage.head.map((cell, index) => (
                        <th key={`${cell}-${index}`}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.amperage.rows.map((row, index) => (
                      <tr key={`${row[0]}-${index}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
