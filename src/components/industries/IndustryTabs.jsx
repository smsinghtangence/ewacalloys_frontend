"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";

// Where the strip was scrolled on the previous industry page. Each industry is its own page, so the strip
// is mounted fresh on every click; starting from the old position lets it glide on instead of jumping back.
let lastScrollLeft = 0;

/**
 * Industry tab strip. On narrow screens it scrolls sideways; the active tab is scrolled to the middle so
 * the tabs next to it (the next industry) come into view.
 */
export default function IndustryTabs({ industries, activeSlug }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector("a.active");
    if (!nav || !active) return;

    nav.scrollLeft = lastScrollLeft;
    const navBox = nav.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const target = nav.scrollLeft + (activeBox.left - navBox.left) - (nav.clientWidth - activeBox.width) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? "auto" : "smooth" });

    const remember = () => {
      lastScrollLeft = nav.scrollLeft;
    };
    nav.addEventListener("scroll", remember, { passive: true });
    return () => nav.removeEventListener("scroll", remember);
  }, [activeSlug]);

  return (
    <nav className="ind-tabs" aria-label="Industries" ref={navRef}>
      <span className="ind-tabs-label">Industries</span>
      {industries.map((item) => (
        <Link
          key={item.slug}
          href={`/our_industries/${item.slug}`}
          className={item.slug === activeSlug ? "active" : ""}
          aria-current={item.slug === activeSlug ? "page" : undefined}
          scroll={false}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
