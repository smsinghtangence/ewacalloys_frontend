"use client";

import CardCarousel from "@/components/shared/CardCarousel";

const SLIDES = [
  { src: "/assets/images/about/about-ewac-building.webp", alt: "EWAC Alloys Limited - Ankleshwar plant" },
  { src: "/assets/images/facilities/manufacturing-plant-ankleshwar.jpg", alt: "Manufacturing Plant - Ankleshwar" },
];

export default function FacilityPlantSlider() {
  return (
    <div className="fac-plant-slider" data-aos="fade-right">
      <CardCarousel
        items={SLIDES}
        keyExtractor={(slide) => slide.src}
        loop
        autoplayMs={4000}
        dots
        dotsClassName="fac-plant-dots"
        dotClassName=""
        activeDotClassName="is-active"
        renderItem={(slide) => (
          <div className="fac-plant-img">
            <img src={slide.src} alt={slide.alt} />
          </div>
        )}
      />
    </div>
  );
}
