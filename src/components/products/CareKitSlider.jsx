"use client";

import { useRef } from "react";
import CardCarousel from "@/components/shared/CardCarousel";

// Care Kit items, 3 / 2 / 1 per screen (desktop / tablet / phone), with arrows and dots.
export default function CareKitSlider({ items }) {
  const carouselRef = useRef(null);

  return (
    <div className="ck-slider">
      <CardCarousel
        ref={carouselRef}
        items={items}
        keyExtractor={(item) => item.src}
        slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
        dots
        dotsClassName="ck-dots"
        dotClassName="ck-dot"
        activeDotClassName="ck-dot is-active"
        renderItem={(item) => (
          <div className="ck-slide">
            <div className="ck-slide-card">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          </div>
        )}
      />
      <div className="ck-arrows">
        <button type="button" className="ck-arrow" aria-label="Previous item" onClick={() => carouselRef.current?.scrollPrev()}>
          <i className="fas fa-arrow-left" aria-hidden="true" />
        </button>
        <button type="button" className="ck-arrow" aria-label="Next item" onClick={() => carouselRef.current?.scrollNext()}>
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
