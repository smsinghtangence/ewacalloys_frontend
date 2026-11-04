"use client";

import { useEffect } from "react";
import GearBackdrop from "@/components/shared/GearBackdrop";
import BlogListCard from "@/components/shared/BlogListCard";
import { useTabs } from "@/components/shared/useTabs";
import { INSIGHTS_NEWS_CARDS, INSIGHTS_CASE_CARDS } from "@/components/blogs/blogData";

// The Blogs tab's cards come from the page (Strapi); News and Case Studies are still built in.
const OTHER_TABS = [
  { id: "news-pane", label: "News", cards: INSIGHTS_NEWS_CARDS, viewAllLabel: "View all News", viewAllHref: "/news" },
  {
    id: "case-pane",
    label: "Case Studies",
    cards: INSIGHTS_CASE_CARDS,
    viewAllLabel: "View all Case Studies",
    viewAllHref: "/case-studies",
  },
];

export default function InsightsTabs({ blogCards }) {
  const TABS = [
    { id: "blogs-pane", label: "Blogs", cards: blogCards, viewAllLabel: "View all Blogs", viewAllHref: "/blogs" },
    ...OTHER_TABS,
  ];
  const { activeTab, setActiveTab } = useTabs(TABS.map((tab) => tab.id));

  // Homepage "View all News"/"View all Case Studies" links point at
  // /insights#news-pane and /insights#case-pane — open the matching tab.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (TABS.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, [setActiveTab]);

  return (
    <section className="insights-tabs-section">
      <GearBackdrop className="insights-gear-top" />
      <GearBackdrop className="insights-gear-bottom" />
      <div className="container">
        <ul className="nav insights-tabs" id="insightsTab" role="tablist">
          {TABS.map((tab) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <button
                className={`nav-link${tab.id === activeTab ? " active" : ""}`}
                id={`${tab.id}-tab`}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={tab.id === activeTab}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" id="insightsTabContent">
          {TABS.filter((tab) => tab.id === activeTab).map((tab) => (
            <div
              className="tab-pane fade show active"
              id={tab.id}
              role="tabpanel"
              aria-labelledby={`${tab.id}-tab`}
              key={tab.id}
            >
              <div className="row gy-5 gx-4">
                {tab.cards.map((card) => (
                  <div className="col-lg-4 col-md-6" key={card.title}>
                    <BlogListCard {...card} />
                  </div>
                ))}
              </div>

              <div className="text-center insights-viewall-wrap">
                <a href={tab.viewAllHref} className="insights-viewall-btn">
                  {tab.viewAllLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
