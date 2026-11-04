"use client";

import CardCarousel from "@/components/shared/CardCarousel";

/** Photo slider beside each application on the Railways page: one photo at a time, moves by itself. */
export default function RailwayGallery({ images, alt }) {
  return (
    <CardCarousel
      items={images}
      keyExtractor={(image) => image}
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
