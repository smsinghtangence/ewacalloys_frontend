"use client";

import CardCarousel from "@/components/shared/CardCarousel";

const SLIDES = [
  { src: "/assets/images/life/reward-1.jpg", alt: "An associate receiving a recognition award" },
  { src: "/assets/images/life/reward-2.png", alt: "EWAC associates at a recognition event" },
];

export default function LifeRewardsSlider() {
  return (
    <div className="life-rewards-slider">
      <CardCarousel
        items={SLIDES}
        keyExtractor={(slide) => slide.src}
        loop
        autoplayMs={4500}
        dots
        dotsClassName="fac-plant-dots"
        dotClassName=""
        activeDotClassName="is-active"
        renderItem={(slide) => (
          <div className="life-rewards-photo">
            <img src={slide.src} alt={slide.alt} />
          </div>
        )}
      />
    </div>
  );
}
