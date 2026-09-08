"use client";

import { useRef } from "react";
import CardCarousel, { type CardCarouselHandle } from "@/components/shared/CardCarousel";
import type { CatalogService } from "@/lib/catalog";

export default function OurServices({ services }: { services: CatalogService[] }) {
  const carouselRef = useRef<CardCarouselHandle>(null);

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
              needs across all industries through our turnkey solutions.{" "}
              <a href="#" className="services-readmore">
                Read More
              </a>
            </p>
          </div>
        </div>

        <div className="services-slider-wrapper">
          <button
            className="svc-arrow svc-prev"
            type="button"
            onClick={() => carouselRef.current?.scrollPrev()}
          >
            <i className="fas fa-chevron-left" />
          </button>

          <CardCarousel
            ref={carouselRef}
            items={services}
            keyExtractor={(item) => item.id}
            slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
            autoplayMs={3500}
            className="services-slider"
            renderItem={(service) => (
              <a href="#" className="svc-card-link">
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

          <button
            className="svc-arrow svc-next"
            type="button"
            onClick={() => carouselRef.current?.scrollNext()}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
