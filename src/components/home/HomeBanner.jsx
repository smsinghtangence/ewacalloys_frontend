"use client";

import { useCallback, useRef, useState } from "react";
import CardCarousel, { } from "@/components/shared/CardCarousel";

const SLIDES = [
  { desktop: "/assets/images/Sugar-Plant.jpg", mobile: "/assets/images/sugar-plant-mobile.jpg" },
  { desktop: "/assets/images/steel-industry.jpg", mobile: "/assets/images/steel-industry-mobile.jpg" },
];

const arrowClass =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:bg-[#c0392b] hover:border-[#c0392b]";

export default function HomeBanner() {
  const carouselRef = useRef(null);
  const [counter, setCounter] = useState({ current: 1, total: SLIDES.length });
  const handleSelect = useCallback((index, total) => {
    setCounter({ current: index + 1, total });
  }, []);

  return (
    <section className="home-banner">
      <div className="banner-slider relative">
        <CardCarousel
          ref={carouselRef}
          items={SLIDES}
          loop
          autoplayMs={2600}
          dots
          slideClassName="basis-full"
          keyExtractor={(slide) => slide.desktop}
          onSelect={handleSelect}
          renderItem={(slide) => (
            <div className="slick-slideshow__slide">
              <img className="banner-desktop" src={slide.desktop} alt="" />
              <img className="banner-mob" src={slide.mobile} alt="" />
            </div>
          )}
        />
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => carouselRef.current?.scrollPrev()}
          className={`${arrowClass} left-4`}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => carouselRef.current?.scrollNext()}
          className={`${arrowClass} right-4`}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
      <div className="container">
        <div id="counter">
          <span className="counter">{counter.current}</span>
          <span> - cement /</span>
          <span className="number">{counter.total}</span>
        </div>
      </div>
    </section>
  );
}
