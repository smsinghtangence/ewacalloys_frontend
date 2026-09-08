"use client";

import CardCarousel from "@/components/shared/CardCarousel";

export type UniSliderCard = { image: string; title: string };

export default function UniSlider({
  heading,
  cards,
  footerLabel,
  footerHref,
  sectionClassName,
  decoration,
}: {
  heading: string;
  cards: UniSliderCard[];
  footerLabel: string;
  footerHref: string;
  sectionClassName: string;
  decoration: "gif" | "gears";
}) {
  return (
    <section className={`uni-slider-section ${sectionClassName}`}>
      <div className="uni-men-bg">
        {decoration === "gif" ? (
          <img src="/assets/images/Welding_Animation.gif" alt="img" />
        ) : (
          <>
            <img src="/assets/images/about-gear1.svg" alt="img" className="gear1" />
            <img src="/assets/images/about-gear2.svg" alt="img" className="gear2" />
            <img src="/assets/images/about-gear2.svg" alt="img" className="gear3" />
          </>
        )}
      </div>
      <div className="heading-back-wrap" />
      <div className="container">
        <div className="uni-slider-heading">
          <h2>{heading}</h2>
        </div>

        <div className="uni-slider-wrap">
          <CardCarousel
            items={cards}
            keyExtractor={(card, index) => `${card.title}-${index}`}
            slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
            className="services-slider"
            renderItem={(card) => (
              <div className="svc-card">
                <div className="svc-img-wrap">
                  <img src={card.image} alt={card.title} />
                </div>
                <h3 className="svc-name">{card.title}</h3>
                <a href="#" className="svc-link">
                  Read More
                </a>
              </div>
            )}
          />

          <div className="uni-slider-footer">
            <a href={footerHref} className="blogs-view-all">
              {footerLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
