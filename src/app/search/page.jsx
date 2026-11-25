import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import { fetchStrapi, getProducts } from "@/lib/catalog";
import { INDUSTRY_DETAILS } from "@/components/industries/industryDetails";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/search").
export const generateMetadata = () => getPageMeta("/search", {
  title: "Search",
  description: "Search EWAC Alloys products, industries and blogs.",
});

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

const STATIC_INDEX = [
  ...PAGES.map((item) => ({ ...item, type: "Page" })),
  ...INDUSTRY_DETAILS.map((item) => ({
    title: `${item.name} Industry`,
    href: `/our_industries/${item.slug}`,
    keywords: item.description.join(" "),
    type: "Industry",
  })),
];

function search(index, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index.map((item) => {
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
  const products = await getProducts();
  const blogs = await fetchStrapi("/api/blogs?fields[0]=Heading&fields[1]=slug&filters[slug][$notNull]=true&pagination[pageSize]=100");
  const index = [
    ...STATIC_INDEX,
    ...products.map((product) => ({
      title: product.name,
      href: `/products/${product.category}/${product.slug}`,
      keywords: `${product.description} ${product.productCategory} ${product.type} ${product.process} ${product.brand} ${product.categoryName} ${product.subCategory}`,
      type: "Product",
    })),
    ...blogs.map((blog) => ({ title: blog.Heading, href: `/blogs/${blog.slug}`, keywords: "", type: "Blog" })),
  ];
  const results = search(index, query);

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
