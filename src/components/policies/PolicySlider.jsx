"use client";

import { useEffect, useRef, useState } from "react";
import CardCarousel, { } from "@/components/shared/CardCarousel";
import { POLICIES } from "@/components/policies/policiesData";

// Photo for each card. These are existing site photos used as stand-ins; replace a file (or the path here)
// to change a card's picture.
const IMAGES = {
  "whistle-blower-policy": "/assets/images/life/career-1.jpg",
  "anti-bribery-and-anti-corruption-policy": "/assets/images/life/career-3.jpg",
  "policy-on-prevention-of-sexual-harassment": "/assets/images/life/career-4.jpg",
  "policy-on-remuneration": "/assets/images/life/reward-1.jpg",
  "policy-on-corporate-social-responsibility": "/assets/images/about/mission-photo.webp",
  "environment-health-safety-ehs": "/assets/images/about/strengths-photo.webp",
  "quality-policy": "/assets/images/about/achievements-photo.webp",
  "iso-certification": "/assets/images/about/about-ewac-building.webp",
  "posh-revised": "/assets/images/life/career-6.jpg",
  "code-of-conduct": "/assets/images/life/career-5.jpg",
};

function PolicyCard({ policy, tone, onOpen }) {
  const inner = (
    <>
      <img className="policy-card-img" src={IMAGES[policy.slug] ?? "/assets/images/about/about-ewac-building.webp"} alt="" />
      <span className="policy-card-title">{policy.title}</span>
      <span className="policy-card-hover">
        <strong>{policy.title}</strong>
        <span className="policy-card-arrow" aria-hidden="true">
          <i className="fas fa-arrow-right" />
        </span>
      </span>
    </>
  );

  return policy.pdf ? (
    <a className={`policy-card tone-${tone}`} href={policy.pdf} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <button type="button" className={`policy-card tone-${tone}`} onClick={() => onOpen(policy)}>
      {inner}
    </button>
  );
}

export default function PolicySlider() {
  const carouselRef = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="policy-slider">
      <button type="button" className="policy-arrow policy-arrow--prev" aria-label="Previous policies" onClick={() => carouselRef.current?.scrollPrev()}>
        <i className="fas fa-chevron-left" />
      </button>

      <CardCarousel
        ref={carouselRef}
        items={POLICIES}
        keyExtractor={(policy) => policy.slug}
        loop
        autoplayMs={4000}
        dots
        dotsClassName="fac-plant-dots policy-dots"
        dotClassName=""
        activeDotClassName="is-active"
        slideClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        renderItem={(policy, index) => (
          <div className="policy-slide">
            <PolicyCard policy={policy} tone={index % 3} onOpen={setOpen} />
          </div>
        )}
      />

      <button type="button" className="policy-arrow policy-arrow--next" aria-label="Next policies" onClick={() => carouselRef.current?.scrollNext()}>
        <i className="fas fa-chevron-right" />
      </button>

      {open && (
        <div className="exports-modal" role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="exports-modal-backdrop" onClick={() => setOpen(null)} />
          <div className="policy-modal-body">
            <button type="button" className="exports-modal-close" aria-label="Close" onClick={() => setOpen(null)}>
              <i className="fas fa-times" />
            </button>
            <h2>{open.title}</h2>
            <div className="policy-modal-content" dangerouslySetInnerHTML={{ __html: open.html }} />
          </div>
        </div>
      )}
    </div>
  );
}
