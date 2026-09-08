"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import useEmblaCarousel from "embla-carousel-react";

export type CardCarouselHandle = {
  scrollPrev: () => void;
  scrollNext: () => void;
};

type CardCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  /** Tailwind classes controlling each slide's width, e.g. "basis-full sm:basis-1/2 lg:basis-1/3" */
  slideClassName?: string;
  loop?: boolean;
  autoplayMs?: number;
  pauseOnHover?: boolean;
  dots?: boolean;
  className?: string;
  onSelect?: (selectedIndex: number, total: number) => void;
};

function CardCarouselInner<T>(
  {
    items,
    renderItem,
    keyExtractor,
    slideClassName = "basis-full",
    loop = false,
    autoplayMs,
    pauseOnHover = true,
    dots = false,
    className = "",
    onSelect,
  }: CardCarouselProps<T>,
  ref: Ref<CardCarouselHandle>
) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
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
        <div className="mt-4 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-[#c0392b]"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const CardCarousel = forwardRef(CardCarouselInner) as <T>(
  props: CardCarouselProps<T> & { ref?: Ref<CardCarouselHandle> }
) => ReactElement;

export default CardCarousel;
