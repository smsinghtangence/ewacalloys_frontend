"use client";

import { useEffect, useRef, useState } from "react";
import CardCarousel from "@/components/shared/CardCarousel";

// Cards visible at once — keep in step with slideClassName below (sm = 640px, lg = 1024px).
function cardsPerScreen() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

export default function OurServices({ services }) {
  const carouselRef = useRef(null);
  // Arrows (and autoplay) only when there are more services than fit on the screen.
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const update = () => setShowArrows(services.length > cardsPerScreen());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [services.length]);

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <div className="services-header-left">
            <h2 className="services-heading">Our Services</h2>
            <p className="services-sub">
              EWAC Alloys Limited has been in preventive maintenance and repair of industrial
              machinery, we offer an unrivalled range of cost-effective solutions to
              wear-related problems since 1962. We consistently serve maintenance and repair
              needs across all industries through our turnkey solutions.
            </p>
          </div>
        </div>

        <div className="services-slider-wrapper">
          {showArrows && (
            <button
              className="svc-arrow svc-prev"
              type="button"
              aria-label="Previous services"
              onClick={() => carouselRef.current?.scrollPrev()}
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
          )}

          <CardCarousel
            ref={carouselRef}
            items={services}
            keyExtractor={(item) => item.id}
            slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
            autoplayMs={showArrows ? 3500 : undefined}
            className="services-slider"
            renderItem={(service) => (
              <a href={service.href} className="svc-card-link">
                <div className="svc-card">
                  <div className="svc-img-wrap">
                    <img src={service.image.url} alt={service.name} />
                  </div>
                  <h3 className="svc-name">{service.name}</h3>
                  <p className="svc-desc">{service.description}</p>
                </div>
              </a>
            )}
          />

          {showArrows && (
            <button
              className="svc-arrow svc-next"
              type="button"
              aria-label="Next services"
              onClick={() => carouselRef.current?.scrollNext()}
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
