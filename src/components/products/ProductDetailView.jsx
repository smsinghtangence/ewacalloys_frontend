"use client";

import { useEffect, useRef, useState } from "react";

/** Product photo slider: arrows, swipe, autoplay and clickable thumbnails. */
export function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = images.length;

  const go = (step) => setActive((current) => (current + step + total) % total);

  // Autoplay; restarts after any manual change and stops while hovered or for reduced motion.
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((current) => (current + 1) % total), 3500);
    return () => window.clearTimeout(id);
  }, [active, paused, total]);

  return (
    <div className="pd-gallery">
      <div
        className="pd-main-img"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchX.current === null) return;
          const dx = event.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="pd-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {images.map((src) => (
            <img key={src} src={src} alt={name} />
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="pd-thumbs">
          {images.map((src, index) => (
            <button
              type="button"
              key={src}
              className={`pd-thumb${index === active ? " is-active" : ""}`}
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setActive(index)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** "Outstanding Features" / "Recommendations" tabs. */
export function ProductTabs({ features, recommendations }) {
  const [tab, setTab] = useState("features");
  const list = tab === "features" ? features : recommendations;

  return (
    <div className="pd-tabs-wrap">
      <div className="pd-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "features"}
          className={`pd-tab${tab === "features" ? " is-active" : ""}`}
          onClick={() => setTab("features")}
        >
          Outstanding Features
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "recommendations"}
          className={`pd-tab${tab === "recommendations" ? " is-active" : ""}`}
          onClick={() => setTab("recommendations")}
        >
          Recommendations
        </button>
      </div>
      <div className="pd-list">
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
