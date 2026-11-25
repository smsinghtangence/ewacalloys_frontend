"use client";

import CardCarousel from "@/components/shared/CardCarousel";

/**
 * Photo slider beside each application on the Railways page, moves by itself. One photo at a time on
 * desktop; two side by side below 640px, so the small source photos are not blown up to the full screen width.
 */
export default function RailwayGallery({ images, alt }) {
  return (
    <CardCarousel
      items={images}
      keyExtractor={(image) => image}
      slideClassName="rw-gallery-slide"
      loop
      autoplayMs={3500}
      dots
      dotsClassName="tk-dots rw-dots"
      dotClassName="tk-dot tk-dot--grey"
      activeDotClassName="tk-dot tk-dot--grey is-active"
      renderItem={(image, index) => (
        <div className="rw-gallery-card">
          <img src={image} alt={`${alt} ${index + 1}`} />
        </div>
      )}
    />
  );
}
