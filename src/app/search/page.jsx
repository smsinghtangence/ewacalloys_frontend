import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import { BLOG_POSTS } from "@/components/blogs/blogPosts";
import { INDUSTRY_DETAILS } from "@/components/industries/industryDetails";
import { PRODUCTS } from "@/components/products/productsData";

export const metadata = {
  title: "Search | EWAC",
  robots: { index: false },
};

const PAGES = [
  { title: "About Us", href: "/about-us", keywords: "company history mission vision strengths ewac" },
  { title: "Board of Directors", href: "/about-us/company-info", keywords: "chairman director ceo management" },
  { title: "Facilities", href: "/about-us/facilities", keywords: "plant ankleshwar reclamation pune iso certificates" },
  { title: "Exports", href: "/about-us/export", keywords: "export countries global" },
  { title: "Turnkey Solution", href: "/our_services/turnkey-solution", keywords: "services workshop on-site repair refurbishment thermal spray hvof" },
  { title: "Products", href: "/products", keywords: "electrodes wires brazing alloys fluxes welding" },
  { title: "Life at EWAC", href: "/life-at-ewac", keywords: "careers jobs benefits rewards culture" },
  { title: "Safety and Environment", href: "/safety-and-environment", keywords: "ehs iso quality policy" },
  { title: "Policies", href: "/policies", keywords: "code of conduct certifications" },
  { title: "Blogs", href: "/blogs", keywords: "articles insights" },
  { title: "News", href: "/news", keywords: "press events" },
  { title: "Case Studies", href: "/case-studies", keywords: "projects success stories" },
  { title: "Insights", href: "/insights", keywords: "blogs news case studies" },
  { title: "Contact Us", href: "/contact-us", keywords: "enquiry address phone email office" },
  { title: "Privacy Policy", href: "/privacy-policy", keywords: "data personal information cookies" },
  { title: "Terms & Conditions", href: "/terms-conditions", keywords: "legal terms use" },
];

// One entry per product name (the catalogue repeats names across brands), linking to its category.
const PRODUCT_ENTRIES = [...new Map(PRODUCTS.map((p) => [p.name, p])).values()].map((p) => ({
  title: p.name,
  href: `/products/${p.category}`,
  keywords: `${p.description} ${p.type} ${p.process}`,
}));

const INDEX = [
  ...PAGES.map((item) => ({ ...item, type: "Page" })),
  ...PRODUCT_ENTRIES.map((item) => ({ ...item, type: "Product" })),
  ...INDUSTRY_DETAILS.map((item) => ({
    title: `${item.name} Industry`,
    href: `/our_industries/${item.slug}`,
    keywords: item.description.join(" "),
    type: "Industry",
  })),
  ...BLOG_POSTS.map((post) => ({
    title: post.title,
    href: `/blogs/${post.slug}`,
    keywords: "",
    type: "Blog",
  })),
];

function search(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return INDEX.map((item) => {
    const title = item.title.toLowerCase();
    const text = `${title} ${item.keywords.toLowerCase()}`;
    if (!words.every((word) => text.includes(word))) return null;
    // titles that match rank above matches that only appear in the description
    const score = words.reduce((sum, word) => sum + (title.includes(word) ? 2 : 1), 0);
    return { ...item, score };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const results = search(query);

  return (
    <>
      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Search" />
        </div>
      </section>

      <section className="search-results">
        <div className="container">
          <h1>{query ? <>Search results for &ldquo;{query}&rdquo;</> : "Search"}</h1>
          <p className="search-count">
            {!query
              ? "Type what you are looking for in the search bar at the top of the page."
              : results.length
                ? `${results.length} result${results.length === 1 ? "" : "s"} found`
                : "No results found. Try a different word, such as a product, industry or page name."}
          </p>

          <ul className="search-list">
            {results.map((result) => (
              <li key={`${result.type}-${result.href}-${result.title}`}>
                <Link href={result.href}>
                  <span className="search-type">{result.type}</span>
                  <span className="search-title">{result.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
