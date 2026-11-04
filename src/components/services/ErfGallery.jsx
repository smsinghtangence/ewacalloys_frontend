"use client";

import CardCarousel from "@/components/shared/CardCarousel";

/** Workshop photo slider at the bottom of the ERF page: 3 photos on desktop, moves by itself. */
export default function ErfGallery({ images }) {
  return (
    <CardCarousel
      items={images}
      keyExtractor={(image) => image}
      slideClassName="basis-full md:basis-1/2 lg:basis-1/3"
      loop
      autoplayMs={3500}
      dots
      dotsClassName="tk-dots"
      dotClassName="tk-dot tk-dot--grey"
      activeDotClassName="tk-dot tk-dot--grey is-active"
      renderItem={(image, index) => (
        <div className="erf-gallery-slide">
          <div className="rw-gallery-card erf-gallery-card">
            <img src={image} alt={`Job done at the EWAC Reclamation Facility ${index + 1}`} />
          </div>
        </div>
      )}
    />
  );
}
