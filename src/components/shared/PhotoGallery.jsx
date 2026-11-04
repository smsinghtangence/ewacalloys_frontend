"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CardCarousel from "@/components/shared/CardCarousel";

/**
 * Auto-sliding photo strip (ERF and R&D Centre pages). Shows 1 / 2 / 3 photos (phone / tablet / desktop) unless
 * `slideClassName` says otherwise; `alt` is numbered for each photo.
 * Clicking a photo opens it full screen (like Fancybox): arrows, swipe, Esc / arrow keys and a "5 / 30" counter.
 * `largeImages` (same order as `images`) are the bigger files shown there; without them `images` are reused.
 */
export default function PhotoGallery({
  images,
  alt,
  largeImages = images,
  slideClassName = "basis-full md:basis-1/2 lg:basis-1/3",
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <CardCarousel
        items={images}
        keyExtractor={(image) => image}
        slideClassName={slideClassName}
        loop
        autoplayMs={3500}
        dots
        dotsClassName="tk-dots"
        dotClassName="tk-dot tk-dot--grey"
        activeDotClassName="tk-dot tk-dot--grey is-active"
        renderItem={(image, index) => (
          <div className="erf-gallery-slide">
            <button
              type="button"
              className="rw-gallery-card erf-gallery-card photo-gallery-open"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo ${index + 1} of ${images.length}`}
            >
              <img src={image} alt={`${alt} ${index + 1}`} loading="lazy" />
              <span className="photo-gallery-zoom" aria-hidden="true">
                <i className="fas fa-search-plus" />
              </span>
            </button>
          </div>
        )}
      />

      {openIndex !== null && (
        <Lightbox images={largeImages} alt={alt} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}

function Lightbox({ images, alt, startIndex, onClose }) {
  const carouselRef = useRef(null);
  const closeRef = useRef(null);
  const [current, setCurrent] = useState(startIndex);

  // Esc closes, arrow keys move; the page behind doesn't scroll while the viewer is open.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") carouselRef.current?.scrollPrev();
      if (event.key === "ArrowRight") carouselRef.current?.scrollNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Rendered into <body> so no parent's transform/overflow can clip the full-screen layer.
  return createPortal(
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={alt}>
      <div className="photo-lightbox-backdrop" onClick={onClose} />

      <div className="photo-lightbox-bar">
        <span className="photo-lightbox-count">
          {current + 1} / {images.length}
        </span>
        <button type="button" ref={closeRef} className="photo-lightbox-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times" />
        </button>
      </div>

      <div className="photo-lightbox-stage">
        <CardCarousel
          ref={carouselRef}
          items={images}
          keyExtractor={(image) => image}
          startIndex={startIndex}
          loop
          onSelect={(index) => setCurrent(index)}
          renderItem={(image, index) => (
            <div className="photo-lightbox-slide" onClick={(event) => event.target === event.currentTarget && onClose()}>
              <img src={image} alt={`${alt} ${index + 1}`} />
            </div>
          )}
        />
      </div>

      <button
        type="button"
        className="photo-lightbox-arrow photo-lightbox-prev"
        onClick={() => carouselRef.current?.scrollPrev()}
        aria-label="Previous photo"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        type="button"
        className="photo-lightbox-arrow photo-lightbox-next"
        onClick={() => carouselRef.current?.scrollNext()}
        aria-label="Next photo"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>,
    document.body
  );
}
