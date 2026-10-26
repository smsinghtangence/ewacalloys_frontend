"use client";

import { useRef } from "react";
import CardCarousel, { } from "@/components/shared/CardCarousel";


export default function IndustriesWeServe({ industries }) {
  const carouselRef = useRef(null);

  return (
    <section className="industries-section">
      <div className="container">
        <h2 className="ind-heading">Industries We Serve</h2>
        <p className="ind-sub">
          EWAC serves a wide range of industries including Steel, Cement, Mining, Power,
          Railways, Heavy Engineering, Oil &amp; Gas, and Infrastructure. Our advanced welding
          and wear protection solutions are designed to improve equipment life, enhance
          productivity, and reduce maintenance costs across demanding industrial applications.
        </p>
      </div>

      <div className="industries-slider-wrap">
        <div className="container">
          <button
            className="ind-arrow ind-prev"
            type="button"
            onClick={() => carouselRef.current?.scrollPrev()}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            className="ind-arrow ind-next"
            type="button"
            onClick={() => carouselRef.current?.scrollNext()}
          >
            <i className="fas fa-chevron-right" />
          </button>

          <CardCarousel
            ref={carouselRef}
            items={industries}
            keyExtractor={(item) => item.id}
            slideClassName="basis-1/2 sm:basis-1/3 lg:basis-1/4"
            autoplayMs={3000}
            className="industries-slider"
            renderItem={(industry) => (
              <div className="ind-slide">
                <div className="ind-card">
                  <img src={industry.image.url} alt={industry.name} />
                  <div className="ind-label">{industry.name}</div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
