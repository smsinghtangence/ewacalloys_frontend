import Link from "next/link";
import GearBackdrop from "@/components/shared/GearBackdrop";
import BlogListCard, { } from "@/components/shared/BlogListCard";

const TABS = [
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "news", label: "News", href: "/news" },
  { id: "case-studies", label: "Case Studies", href: "/case-studies" },
];

/**
 * Card grid used by the Blogs, News and Case Studies pages. Same look as the Insights tabs, but each
 * tab is a link to its own page (the active one is highlighted) instead of switching content in place.
 */
export default function PostListing({
  cards,
  activeTab,
}) {
  return (
    <section className="insights-tabs-section post-listing">
      <GearBackdrop className="insights-gear-top" />
      <GearBackdrop className="insights-gear-bottom" />
      <div className="container">
        <ul className="nav insights-tabs" aria-label="Insights sections">
          {TABS.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <Link
                href={tab.href}
                className={`nav-link${tab.id === activeTab ? " active" : ""}`}
                aria-current={tab.id === activeTab ? "page" : undefined}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="row gy-5 gx-4">
          {cards.map((card) => (
            <div className="col-lg-4 col-md-6" key={card.title}>
              <BlogListCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
