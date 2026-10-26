"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";





function CardCarouselInner(
  {
    items,
    renderItem,
    keyExtractor,
    slideClassName = "basis-full",
    loop = false,
    align = "start",
    autoplayMs,
    pauseOnHover = true,
    dots = false,
    dotsClassName = "mt-4 flex items-center justify-center gap-2",
    dotClassName = "h-2 w-2 rounded-full bg-white/50 transition-all",
    activeDotClassName = "h-2 w-6 rounded-full bg-[#c0392b] transition-all",
    className = "",
    onSelect,
  },
  ref
) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const pausedRef = useRef(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useImperativeHandle(ref, () => ({
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
  }));

  const onEmblaSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onSelectRef.current?.(index, emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onEmblaSelect();
    emblaApi.on("select", onEmblaSelect);
    emblaApi.on("reInit", onEmblaSelect);
    return () => {
      emblaApi.off("select", onEmblaSelect);
      emblaApi.off("reInit", onEmblaSelect);
    };
  }, [emblaApi, onEmblaSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplayMs) return;
    const id = setInterval(() => {
      if (!pausedRef.current) emblaApi.scrollNext();
    }, autoplayMs);
    return () => clearInterval(id);
  }, [emblaApi, autoplayMs]);

  return (
    <div
      className={className}
      onMouseEnter={() => {
        if (pauseOnHover) pausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) pausedRef.current = false;
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div
              className={`shrink-0 grow-0 ${slideClassName}`}
              key={keyExtractor ? keyExtractor(item, index) : index}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {dots && scrollSnaps.length > 1 && (
        <div className={dotsClassName}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={index === selectedIndex ? activeDotClassName : dotClassName}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const CardCarousel = forwardRef(CardCarouselInner);

export default CardCarousel;
