import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import ProductListing from "@/components/products/ProductListing";

export default function ProductsPageView({ category }) {
  return (
    <>
      <InnerBanner
        src="/assets/images/products-page/products-banner.webp"
        mobileSrc="/assets/images/products-page/products-banner-mobile.webp"
        alt={category?.name ?? "Products"}
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb
            current={category?.name ?? "Products"}
            trail={category ? [{ label: "Products", href: "/products" }] : []}
          />
        </div>
      </section>

      <div className="products-wrap">
        <GearBackdrop className="products-gear" />
        <ProductListing category={category?.slug} />
      </div>

      <ConsultCta welderDecoration />
    </>
  );
}
