"use client";

import { useRef } from "react";
import CardCarousel, { } from "@/components/shared/CardCarousel";
import { useTabs } from "@/components/shared/useTabs";


// Design (index.php) shows a 5th "Equipment" tab here that isn't backed by any
// product-category in the CMS yet — kept as a static, product-less tab until
// real Equipment products are added in Strapi.
const EQUIPMENT_TAB = {
  id: -1,
  name: "Equipment",
  slug: "equipment",
  image: { url: "/assets/images/products2.webp", alt: "Equipment" },
  products: [],
};

export default function FindTheRightSolution({
  productCategories,
}) {
  const tabs = [...productCategories, EQUIPMENT_TAB];
  const { activeTab, setActiveTab, onDropdownChange } = useTabs(tabs.map((category) => category.slug));
  const carouselRef = useRef(null);
  const activePane = tabs.find((category) => category.slug === activeTab) ?? tabs[0];

  if (!activePane) return null;

  return (
    <section className="solution-section">
      <div className="solution-gears" aria-hidden="true">
        <img src="/assets/images/about-gear1.svg" className="gear1" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear2" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear3" alt="img" />
      </div>

      <div className="about-men-bg">
        <img src="/assets/images/Welding_Animation.gif" alt="img" />
      </div>

      <div className="container">
        <div className="lg:w-5/6">
          <div className="solution-intro">
            <h2 className="solution-heading">Find the Right Solution</h2>
            <p className="solution-sub">
              We understand that every industry and application has unique challenges. With
              decades of technical expertise and a comprehensive product portfolio, EWAC
              helps you find reliable and cost-effective solutions tailored to your
              operational needs.
            </p>
          </div>
        </div>

        <div className="solution-wrap">
          <div className="solution-nav-arrows">
            <button
              className="sol-arr sol-arr-prev"
              type="button"
              onClick={() => carouselRef.current?.scrollPrev()}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className="sol-arr sol-arr-next"
              type="button"
              onClick={() => carouselRef.current?.scrollNext()}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>

          <div className="solution-card">
            <div className="solution-left">
              <div className="solution-left-title">Products</div>
              <ul className="sol-tab-list">
                {tabs.map((category) => (
                  <li
                    key={category.slug}
                    className={`sol-tab-item${category.slug === activeTab ? " active" : ""}`}
                    data-tab={category.slug}
                    onClick={() => setActiveTab(category.slug)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>

              <div className="sol-dropdown-wrap">
                <select className="sol-dropdown" id="solDropdown" value={activeTab} onChange={onDropdownChange}>
                  {tabs.map((category) => (
                    <option value={category.slug} key={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <span className="sol-dropdown-arrow">
                  <i className="fas fa-chevron-down" />
                </span>
              </div>
            </div>

            <div className="solution-right">
              <div className="sol-pane active" id={`sol-${activePane.slug}`}>
                <h3 className="sol-pane-title">{activePane.name}</h3>
                <CardCarousel
                  ref={carouselRef}
                  items={activePane.products}
                  keyExtractor={(product) => product.id}
                  slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
                  className="sol-products-slider"
                  renderItem={(product) => (
                    <a href="#" className="sol-prod-card-link">
                      <div className="sol-prod-item">
                        <div className="sol-prod-img">
                          <img src={product.image.url} alt={product.name} />
                        </div>
                        <h4 className="sol-prod-name">{product.name}</h4>
                      </div>
                    </a>
                  )}
                />
                <div className="sol-pane-footer">
                  <a href="#" className="sol-view-all">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
