"use client";

import { useRef } from "react";
import CardCarousel, { } from "@/components/shared/CardCarousel";



// Design (about.php) only has real photos/copy for 1953 and 1962; the 2011,
// "20XX" and 2018 slides are the design's own placeholders (reusing other
// section photos), carried over as-is until real archival content exists.
const SLIDES = [
  {
    year: "1953",
    text: "EWAC was started as a strategic JV between L&T, India and Eutectic + Castolin, USA",
    image: "/assets/images/about/history-1953.webp",
    alt: "1953 — EWAC founding",
  },
  {
    year: "1962",
    text: "Begins manufacturing its products at Mumbai, Maharashtra",
    image: "/assets/images/about/history-1962.webp",
    alt: "1962 — Mumbai manufacturing facility",
  },
  {
    year: "2011",
    text: "EWAC Alloys becomes a wholly owned subsidiary of Larsen & Toubro (L&T)",
    image: "/assets/images/about/about-ewac-building.webp",
    alt: "2011 — L&T subsidiary (placeholder image)",
  },
  {
    year: "20XX",
    text: "Placeholder milestone — add real year and description here",
    image: "/assets/images/about/about-ewac-building.webp",
    alt: "Placeholder milestone image",
  },
  {
    year: "2018",
    text: "EWAC is acquired by Colfax, USA, expanding its global reach",
    image: "/assets/images/about/achievements-photo.webp",
    alt: "2018 — Colfax acquisition (placeholder image)",
  },
];

export default function AboutHistorySlider() {
  const carouselRef = useRef(null);

  return (
    <div className="about-history-stage">
      <h2 className="about-history-heading">EWAC History</h2>

      <CardCarousel
        ref={carouselRef}
        items={SLIDES}
        keyExtractor={(slide) => slide.year}
        slideClassName="basis-full md:basis-1/2"
        className="about-history-slick"
        renderItem={(slide) => (
          <div className="about-history-slide">
            <span className="about-history-ghost">{slide.year}</span>
            <div className="about-history-line" />
            <div className="about-history-caption">
              <span className="about-history-tag">{slide.year}</span>
              <div className="about-history-dot-marker" />
              <h3>{slide.year}</h3>
              <p>{slide.text}</p>
            </div>
            <div className="about-history-photo-wrap">
              <div className="about-history-photo">
                <img src={slide.image} alt={slide.alt} />
              </div>
            </div>
          </div>
        )}
      />

      <div className="about-history-controls">
        <button
          className="about-history-arrow prev"
          type="button"
          aria-label="Previous"
          onClick={() => carouselRef.current?.scrollPrev()}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className="about-history-arrow next"
          type="button"
          aria-label="Next"
          onClick={() => carouselRef.current?.scrollNext()}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
