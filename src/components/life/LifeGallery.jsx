"use client";

import { useEffect, useRef, useState } from "react";




const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

// Photos from the live site's gallery. The old site doesn't say which tab a photo belongs to,
// so they are grouped by when they were uploaded; re-sort them here if that isn't right.
const IMAGES = [
  ...range(8).map((i) => ({
    src: `/assets/images/life/gallery-workshop-${i}.jpg`,
    alt: `Workshop and training session photo ${i}`,
    category: "workshops",
  })),
  ...range(8).map((i) => ({
    src: `/assets/images/life/gallery-conference-${i}.jpg`,
    alt: `Conference and exhibition photo ${i}`,
    category: "conferences",
  })),
];

const TABS = [
  { id: "all", label: "All" },
  { id: "workshops", label: "Workshops & Training Sessions" },
  { id: "conferences", label: "Conferences & Exhibitions" },
];

// The stage is drawn at the design's size (1090 x 410) and scaled down to fit narrower screens.
const STAGE_WIDTH = 1090;
const STAGE_HEIGHT = 410;
const AUTOPLAY_MS = 3500;

// Slick-style "center mode": the active photo is largest, its neighbours tuck behind it.
// x = distance of the slide's left edge from the stage's centre line; w/h = slide size.
const SLOT = {
  [-2]: { x: -448, w: 215, h: 302 },
  [-1]: { x: -377, w: 245, h: 326 },
  0: { x: -232, w: 465, h: 376 },
  1: { x: 107, w: 245, h: 326 },
  2: { x: 234, w: 215, h: 302 },
};

export default function LifeGallery() {
  const [tab, setTab] = useState("all");
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const frameRef = useRef(null);

  const images = tab === "all" ? IMAGES : IMAGES.filter((image) => image.category === tab);
  const total = images.length;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(Math.min(1, frame.clientWidth / STAGE_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  // Autoplay: advance every few seconds. The timer restarts after any manual change (it depends on
  // `index`), and stops while the pointer or keyboard focus is on the slider or the user prefers reduced motion.
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, total]);

  const go = (step) => setIndex((current) => (current + step + total) % total);

  // Signed circular distance of slide i from the active one.
  const offsetOf = (i) => {
    let offset = (i - index + total) % total;
    if (offset > total / 2) offset -= total;
    return offset;
  };

  return (
    <section className="life-gallery">
      <div className="container">
        <h2 className="life-heading">Gallery</h2>

        <ul className="nav insights-tabs life-gallery-tabs" role="tablist">
          {TABS.map((item) => (
            <li className="nav-item" key={item.id} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={item.id === tab}
                className={`nav-link${item.id === tab ? " active" : ""}`}
                onClick={() => {
                  setTab(item.id);
                  setIndex(0);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div
          className="life-gallery-frame"
          ref={frameRef}
          style={{ height: STAGE_HEIGHT * scale }}
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
        >
          <div
            className="life-gallery-stage"
            style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: `translateX(-50%) scale(${scale})` }}
          >
            {images.map((image, i) => {
              const offset = offsetOf(i);
              const slot = SLOT[offset];
              const style = slot
                ? {
                    width: slot.w,
                    height: slot.h,
                    transform: `translate(${slot.x}px, -50%)`,
                    zIndex: 10 - Math.abs(offset) * 4,
                    opacity: 1,
                  }
                : { width: 215, height: 302, transform: "translate(-120px, -50%)", zIndex: 0, opacity: 0 };
              return (
                <button
                  type="button"
                  key={image.src}
                  className={`life-gallery-slide${offset === 0 ? " is-active" : ""}`}
                  style={style}
                  tabIndex={offset === 0 ? 0 : -1}
                  aria-label={image.alt}
                  aria-hidden={!slot}
                  onClick={() => offset !== 0 && go(offset)}
                >
                  <img src={image.src} alt={image.alt} loading={Math.abs(offset) <= 2 ? "eager" : "lazy"} />
                </button>
              );
            })}
          </div>

          <button type="button" className="life-arrow life-arrow--prev" aria-label="Previous photo" onClick={() => go(-1)}>
            <i className="fas fa-chevron-left" />
          </button>
          <button type="button" className="life-arrow life-arrow--next" aria-label="Next photo" onClick={() => go(1)}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
