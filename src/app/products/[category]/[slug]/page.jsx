import { notFound } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import { ProductGallery, ProductTabs } from "@/components/products/ProductDetailView";
import { PRODUCT_DETAILS } from "@/components/products/productDetails";
import { PRODUCTS } from "@/components/products/productsData";

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
  return PRODUCT_DETAILS.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  return product ? { title: `${product.name} | Products | EWAC`, description: product.subtitle } : {};
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

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
              <ProductGallery images={product.images} name={product.name} />

              <div className="pd-wheel">
                <img src={product.wheel} alt="Wear resistance ratings" />
              </div>
            </div>

            <div className="pd-right">
              {product.bestSeller && <span className="pd-badge">Best Seller</span>}
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-subtitle">
                <p>{product.subtitle}</p>
              </div>

              <div className="pd-app-img">
                <img src={product.applicationImage} alt={`${product.name} application`} />
              </div>

              <h2 className="pd-heading">Typical Application</h2>
              <div className="pd-text">
                <p>{product.application}</p>
              </div>

              <ProductTabs features={product.features} recommendations={product.recommendations} />

              <div className="pd-tables">
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
              </div>

              <a href={product.brochure} className="pd-btn">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
