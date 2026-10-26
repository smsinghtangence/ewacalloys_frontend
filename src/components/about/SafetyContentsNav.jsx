"use client";

import { useEffect, useState } from "react";
import Link from "next/link";





const DEFAULT_HELP = {
  title: "Questions?",
  text: "Contact our team for any Safety and Environment related queries.",
};

/** Sticky "Contents" list with scroll-spy. Also used by the Terms & Conditions page (pass `help` to change the box). */
export default function SafetyContentsNav({
  sections,
  help = DEFAULT_HELP,
}) {
  const [activeId, setActiveId] = useState(sections[0].id);

  // Highlight the section currently crossing the upper part of the viewport.
  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el) => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="safety-sidebar">
      <p className="safety-contents-label">Contents</p>
      <ul className="safety-contents">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={section.id === activeId ? "active" : ""}
              onClick={() => setActiveId(section.id)}
            >
              <span className="safety-contents-num">{String(index + 1).padStart(2, "0")}</span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="safety-questions">
        <h3>{help.title}</h3>
        <p>{help.text}</p>
        <Link href="/contact-us">Get in touch &rarr;</Link>
      </div>
    </aside>
  );
}
