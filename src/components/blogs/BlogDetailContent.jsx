"use client";

import { useEffect, useMemo, useState } from "react";

function getSectionTitle(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default function BlogDetailContent({ blocks, title }) {
  const sections = useMemo(
    () => blocks
      .map((block, index) => (
        block.type === "h2" || block.type === "heading"
          ? { id: `blog-section-${index}`, title: block.text ?? getSectionTitle(block.html ?? "") }
          : null
      ))
      .filter(Boolean),
    [blocks]
  );
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!("IntersectionObserver" in window) || sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [sections]);

  function shareArticle(platform) {
    const pageUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(title);
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      email: `mailto:?subject=${shareTitle}&body=${pageUrl}`,
    };

    if (platform === "email") {
      window.location.href = shareUrls.email;
      return;
    }

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  }

  return (
    <div className="blog-article-grid">
      <nav className="blog-article-toc" aria-label="In this article">
        <h2><i className="fas fa-list-ul" aria-hidden="true" /> In This Article</h2>
        {sections.length > 0 ? (
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={activeSection === section.id ? "is-active" : ""}
                  aria-current={activeSection === section.id ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveSection(section.id);
                    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
                    document.getElementById(section.id)?.scrollIntoView({ behavior, block: "start" });
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p>Explore the article below.</p>
        )}
      </nav>

      <div className="blog-article-content">
        {blocks.map((block, index) =>
          block.type === "h2" ? (
            <h2
              key={index}
              id={`blog-section-${index}`}
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          ) : block.type === "heading" ? (
            <h2 key={index} id={`blog-section-${index}`}>
              {block.text}
            </h2>
          ) : block.type === "text" ? (
            <p key={index}>{block.text}</p>
          ) : (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
          )
        )}
      </div>

      <aside className="blog-article-aside">
        <div className="blog-share-card">
          <h2><i className="fas fa-share-nodes" aria-hidden="true" /> Share Article</h2>
          <div className="blog-share-links">
            <button
              type="button"
              onClick={() => shareArticle("linkedin")}
              aria-label="Share on LinkedIn"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => shareArticle("facebook")}
              aria-label="Share on Facebook"
            >
              <i className="fab fa-facebook" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => shareArticle("email")} aria-label="Share by email">
              <i className="far fa-envelope" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="blog-article-careers-card">
          <span className="blog-careers-kicker">Career</span>
          <h2>Apply now!</h2>
          <a href="/careers">More information</a>
        </div>
      </aside>
    </div>
  );
}
