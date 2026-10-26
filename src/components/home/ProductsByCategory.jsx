"use client";

import { useScrollReveal } from "@/components/shared/useScrollReveal";


function ProductCard({ image, name, index }) {
  const { ref, visible } = useScrollReveal();
  return (
    <a
      href="#"
      className="product-links"
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className={`product-card${visible ? " card-visible" : ""}`}>
        <div className="product-img-wrap">
          <img src={image} alt={name} />
        </div>
        <h3 className="product-name">{name}</h3>
      </div>
    </a>
  );
}

export default function ProductsByCategory({
  productCategories,
}) {
  return (
    <section className="products-section" id="products-category">
      <div className="container">
        <h2 className="products-heading">Products by Category</h2>
        <p className="products-sub">
          EWAC offers a comprehensive range of welding consumables, wear protection solutions,
          maintenance &amp; repair products, and industrial welding equipment engineered for
          demanding applications across industries. Our product portfolio is designed to improve
          productivity, extend equipment life, and deliver reliable performance in maintenance,
          reclamation, fabrication, and hardfacing applications.
        </p>
        <div className="products-grid">
          {productCategories.map((category, index) => (
            <ProductCard key={category.id} index={index} image={category.image.url} name={category.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
