"use client";

import { useRef } from "react";
import CardCarousel from "@/components/shared/CardCarousel";

/** Industry photo carousel for the Turnkey Solution page: a plain photo with the industry name as text on top. */
export default function TurnkeyIndustries({ industries }) {
  const carouselRef = useRef(null);

  return (
    <div className="tk-ind-wrap">
      <button
        type="button"
        className="tk-ind-arrow tk-ind-prev"
        aria-label="Previous industries"
        onClick={() => carouselRef.current?.scrollPrev()}
      >
        <i className="fas fa-chevron-left" aria-hidden="true" />
      </button>

      <CardCarousel
        ref={carouselRef}
        items={industries}
        keyExtractor={(industry) => industry.name}
        slideClassName="basis-1/2 lg:basis-1/4"
        loop
        autoplayMs={3000}
        dots
        dotsClassName="tk-dots"
        dotClassName="tk-dot"
        activeDotClassName="tk-dot is-active"
        renderItem={(industry) => (
          <div className="tk-ind-card">
            <img src={industry.image} alt="" />
            <h3>{industry.name}</h3>
          </div>
        )}
      />

      <button
        type="button"
        className="tk-ind-arrow tk-ind-next"
        aria-label="Next industries"
        onClick={() => carouselRef.current?.scrollNext()}
      >
        <i className="fas fa-chevron-right" aria-hidden="true" />
      </button>
    </div>
  );
}
