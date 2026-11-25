"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function countBy(products, pick) {
  const counts = new Map();
  products.forEach((p) => {
    const value = pick(p);
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  return counts;
}

// DUMMY CONTENT — shown on cards whose product has no description yet, so every card looks complete.
const DUMMY_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";

/** One labelled filter dropdown; `options` are [value, label] pairs, "" = All. */
function FilterSelect({ id, label, value, onChange, options }) {
  return (
    <div className="products-filter-field">
      <label className="products-filter-label" htmlFor={id}>
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

// Footer "Products → By …" links open /products?by=<key>; the page then shows that dimension as chips.
const BROWSE_LABELS = {
  category: "Category",
  process: "Process",
  technology: "Technology",
  metal: "Metal Type",
  brand: "Brand",
};
// Product categories that name a base metal (used for "By Metal Type").
const METALS = ["Steel", "Stainless Steel", "Cast Iron", "Copper", "Aluminium", "Special Alloys"];

/** Reads ?by= from the URL. Kept in its own Suspense boundary so the product grid still renders on the server. */
function BrowseParam({ onChange }) {
  const by = useSearchParams().get("by") ?? "";
  useEffect(() => onChange(BROWSE_LABELS[by] ? by : ""), [by, onChange]);
  return null;
}

const unique = (products, pick) => [...new Set(products.map(pick).filter(Boolean))];

/**
 * Filterable product grid. `category` (a main product-category slug) limits the catalogue when given.
 * Filters follow the product hierarchy sheet: Main category > Sub-category > Product Category narrow the
 * hierarchy, then Product Type / Process / Brand list only the values found in that part of it.
 */
export default function ProductListing({ category, products }) {
  const base = useMemo(() => {
    const catalogue = products ?? [];
    return category ? catalogue.filter((product) => product.category === category) : catalogue;
  }, [category, products]);

  const [query, setQuery] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [type, setType] = useState("");
  const [process, setProcess] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [browseBy, setBrowseBy] = useState("");

  const mainCategories = useMemo(() => {
    const options = new Map();
    base.forEach((product) => options.set(product.category, product.categoryName || product.category));
    return [...options.entries()];
  }, [base]);
  const inMain = useMemo(
    () => base.filter((p) => !mainCategory || p.category === mainCategory),
    [base, mainCategory]
  );
  const subCategories = useMemo(() => unique(inMain, (p) => p.subCategory), [inMain]);
  const inSub = useMemo(
    () => inMain.filter((p) => !subCategory || p.subCategory === subCategory),
    [inMain, subCategory]
  );
  const productCategories = useMemo(() => unique(inSub, (p) => p.productCategory), [inSub]);
  const inHierarchy = useMemo(
    () => inSub.filter((p) => !productCategory || p.productCategory === productCategory),
    [inSub, productCategory]
  );
  const typeCounts = useMemo(() => countBy(inHierarchy, (p) => p.type), [inHierarchy]);
  const processes = useMemo(() => unique(inHierarchy, (p) => p.process), [inHierarchy]);
  const brands = useMemo(() => unique(inHierarchy, (p) => p.brand), [inHierarchy]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = inHierarchy.filter(
      (p) =>
        (!type || p.type === type) &&
        (!process || p.process === process) &&
        (!brand || p.brand === brand) &&
        (!q || `${p.name} ${p.description} ${p.type} ${p.process} ${p.brand} ${p.productCategory} ${p.subCategory} ${p.categoryName}`.toLowerCase().includes(q))
    );
    if (sort === "name-asc") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    return filtered;
  }, [inHierarchy, query, type, process, brand, sort]);

  // Changing a hierarchy level clears the filters below it, so none is left on a value that no longer exists.
  const resetBelowHierarchy = () => {
    setType("");
    setProcess("");
    setBrand("");
  };

  const activeFilters = [mainCategory, subCategory, productCategory, type, process, brand].filter(Boolean).length;
  const clearFilters = () => {
    setMainCategory("");
    setSubCategory("");
    setProductCategory("");
    resetBelowHierarchy();
  };

  // Chips for the "Browse by" bar: [value, label, count] over the whole catalogue of this page.
  const browseOptions = useMemo(() => {
    const counted = (pick) => [...countBy(base, pick).entries()].map(([value, count]) => [value, value, count]);
    if (browseBy === "category") {
      const counts = countBy(base, (p) => p.category);
      return mainCategories.map(([slug, name]) => [slug, name, counts.get(slug) ?? 0]);
    }
    if (browseBy === "process") return counted((p) => p.process);
    if (browseBy === "technology") return counted((p) => p.type);
    if (browseBy === "brand") return counted((p) => p.brand).sort((a, b) => a[1].localeCompare(b[1]));
    if (browseBy === "metal") return counted((p) => p.productCategory).filter(([value]) => METALS.includes(value));
    return [];
  }, [browseBy, base, mainCategories]);
  const browseValue = { category: mainCategory, process, technology: type, metal: productCategory, brand }[browseBy] ?? "";
  // A chip replaces every other filter, so the list shows exactly that group.
  const pickBrowse = (value) => {
    clearFilters();
    if (browseBy === "category") setMainCategory(value);
    if (browseBy === "process") setProcess(value);
    if (browseBy === "technology") setType(value);
    if (browseBy === "metal") setProductCategory(value);
    if (browseBy === "brand") setBrand(value);
  };

  return (
    <section className="products-page">
      <Suspense fallback={null}>
        <BrowseParam onChange={setBrowseBy} />
      </Suspense>
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

        {browseOptions.length > 0 && !(browseBy === "category" && category) && (
          <div className="products-browse" role="group" aria-label={`Browse by ${BROWSE_LABELS[browseBy]}`}>
            <span className="products-browse-label">Browse by {BROWSE_LABELS[browseBy]}</span>
            <div className="products-browse-chips">
              <button type="button" className={`products-browse-chip${browseValue ? "" : " is-active"}`} onClick={() => pickBrowse("")}>
                All <small>{base.length}</small>
              </button>
              {browseOptions.map(([value, label, count]) => (
                <button
                  type="button"
                  key={value}
                  className={`products-browse-chip${browseValue === value ? " is-active" : ""}`}
                  aria-pressed={browseValue === value}
                  onClick={() => pickBrowse(value)}
                >
                  {label} <small>{count}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="products-layout">
          <aside className={`products-filters${filtersOpen ? " is-open" : ""}`}>
            {/* On mobile the heading is a toggle; the filters stay collapsed until it is tapped. */}
            <h2>
              <button
                type="button"
                className="products-filters-toggle"
                aria-expanded={filtersOpen}
                aria-controls="productFilters"
                onClick={() => setFiltersOpen((open) => !open)}
              >
                <i className="fas fa-filter" aria-hidden="true" /> Filters
                {activeFilters > 0 && <span className="products-filters-count">{activeFilters}</span>}
                <i className="fas fa-chevron-down products-filters-chevron" aria-hidden="true" />
              </button>
              {activeFilters > 0 && (
                <button type="button" className="products-filters-clear" onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </h2>

            <div className="products-filters-body" id="productFilters">
              {!category && (
                <FilterSelect
                  id="filterMainCategory"
                  label="Main category"
                  value={mainCategory}
                  onChange={(value) => {
                    setMainCategory(value);
                    setSubCategory("");
                    setProductCategory("");
                    resetBelowHierarchy();
                  }}
                  options={mainCategories.map(([slug, name]) => [slug, name])}
                />
              )}

              {subCategories.length > 0 && (
                <FilterSelect
                  id="filterSubCategory"
                  label="Sub-category"
                  value={subCategory}
                  onChange={(value) => {
                    setSubCategory(value);
                    setProductCategory("");
                    resetBelowHierarchy();
                  }}
                  options={subCategories.map((name) => [name, name])}
                />
              )}

              <FilterSelect
                id="filterProductCategory"
                label="Product category"
                value={productCategory}
                onChange={(value) => {
                  setProductCategory(value);
                  resetBelowHierarchy();
                }}
                options={productCategories.map((name) => [name, name])}
              />
              <FilterSelect
                id="filterType"
                label="Product type"
                value={type}
                onChange={setType}
                options={[...typeCounts.entries()].map(([item, count]) => [item, `${item} (${count})`])}
              />
              <FilterSelect id="filterProcess" label="Process" value={process} onChange={setProcess}
                options={processes.map((item) => [item, item])} />
              <FilterSelect id="filterBrand" label="Brand" value={brand} onChange={setBrand}
                options={brands.map((item) => [item, item])} />

              <button type="button" className="products-filters-done" onClick={() => setFiltersOpen(false)}>
                Show {results.length} products
              </button>
            </div>
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
                      {product.image && <img src={product.image} alt={product.name} />}
                      {product.bestSeller && <span className="product-tile-badge">Best Seller</span>}
                    </div>
                    <div className="product-tile-body">
                      <div className="product-tile-tags">
                        {[product.process, product.type, product.brand, product.productCategory].filter(Boolean).map((tag, index) => (
                          <span key={`${tag}-${index}`}>{tag}</span>
                        ))}
                      </div>
                      <h3>{product.name}</h3>
                      <p>{product.description || DUMMY_DESCRIPTION}</p>
                      <Link
                        href={`/products/${product.category}/${product.slug}`}
                        className={`product-tile-btn${product.bestSeller ? " is-red" : ""}`}
                        aria-label={`View details: ${product.name}`}
                      >
                        View Details <i className="fas fa-arrow-right" aria-hidden="true" />
                      </Link>
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
