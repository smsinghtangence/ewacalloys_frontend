"use client";

import CardCarousel from "@/components/shared/CardCarousel";

/** "What we do" slider on the Turnkey Solution page: a plain photo with its caption as text on top. */
export default function TurnkeyServices({ services }) {
  return (
    <CardCarousel
      items={services}
      keyExtractor={(service) => service.title}
      slideClassName="basis-full md:basis-1/2 lg:basis-1/3"
      loop
      autoplayMs={4000}
      dots
      dotsClassName="tk-dots"
      dotClassName="tk-dot tk-dot--grey"
      activeDotClassName="tk-dot tk-dot--grey is-active"
      renderItem={(service) => (
        <div className="tk-what-slide">
          <div className="tk-what-card">
            <img src={service.image} alt="" />
            <h3>{service.title}</h3>
          </div>
        </div>
      )}
    />
  );
}
