"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/components/products/productsData";

function countBy(products, pick) {
  const counts = new Map();
  products.forEach((p) => counts.set(pick(p), (counts.get(pick(p)) ?? 0) + 1));
  return counts;
}

/** Filterable product grid. `category` (a Strapi product-category slug) limits the catalogue when given. */
export default function ProductListing({ category }) {
  const base = useMemo(() => (category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS), [category]);

  const [query, setQuery] = useState("");
  const [types, setTypes] = useState([]);
  const [process, setProcess] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("relevance");

  const typeCounts = useMemo(() => countBy(base, (p) => p.type), [base]);
  const processes = useMemo(() => [...new Set(base.map((p) => p.process))], [base]);
  const brands = useMemo(() => [...new Set(base.map((p) => p.brand))], [base]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = base.filter(
      (p) =>
        (types.length === 0 || types.includes(p.type)) &&
        (!process || p.process === process) &&
        (!brand || p.brand === brand) &&
        (!q || `${p.name} ${p.description} ${p.type} ${p.process} ${p.brand}`.toLowerCase().includes(q))
    );
    if (sort === "name-asc") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    return filtered;
  }, [base, query, types, process, brand, sort]);

  const toggleType = (type) =>
    setTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  return (
    <section className="products-page">
      <div className="container">
        <div className="products-search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={'Search by product name, code, application, or technology... e.g. "hard facing electrode" or "EWAC HF"'}
            aria-label="Search products"
          />
          <i className="fas fa-search" aria-hidden="true" />
        </div>

        <div className="products-layout">
          <aside className="products-filters">
            <h2>
              <i className="fas fa-filter" aria-hidden="true" /> Filters
            </h2>

            <label className="products-filter-label" htmlFor="filterType">
              Product type
            </label>
            <select
              id="filterType"
              value={types.length === 1 ? types[0] : ""}
              onChange={(event) => setTypes(event.target.value ? [event.target.value] : [])}
            >
              <option value="">All</option>
              {[...typeCounts.keys()].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <ul className="products-type-list">
              {[...typeCounts.entries()].map(([type, count]) => (
                <li key={type}>
                  <label>
                    <input type="checkbox" checked={types.includes(type)} onChange={() => toggleType(type)} />
                    <span>{type}</span>
                    <small>{count}</small>
                  </label>
                </li>
              ))}
            </ul>

            <label className="products-filter-label" htmlFor="filterProcess">
              Process
            </label>
            <select id="filterProcess" value={process} onChange={(event) => setProcess(event.target.value)}>
              <option value="">All</option>
              {processes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="products-filter-label" htmlFor="filterBrand">
              Brand
            </label>
            <select id="filterBrand" value={brand} onChange={(event) => setBrand(event.target.value)}>
              <option value="">All</option>
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </aside>

          <div className="products-results">
            <div className="products-results-bar">
              <p>
                <strong>{results.length}</strong> products found
              </p>
              <label>
                <span>Sort:</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>
              </label>
            </div>

            {results.length === 0 ? (
              <p className="products-empty">No products match your filters.</p>
            ) : (
              <div className="products-grid-list">
                {results.map((product) => (
                  <article className="product-tile" key={product.id}>
                    <div className="product-tile-img">
                      <img src={product.image} alt={product.name} />
                      {product.bestSeller && <span className="product-tile-badge">Best Seller</span>}
                    </div>
                    <div className="product-tile-body">
                      <div className="product-tile-tags">
                        <span>{product.process}</span>
                        <span>{product.type}</span>
                      </div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <a
                        href="#"
                        className={`product-tile-btn${product.bestSeller ? " is-red" : ""}`}
                        aria-label={`View details: ${product.name}`}
                      >
                        View Details <i className="fas fa-arrow-right" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
