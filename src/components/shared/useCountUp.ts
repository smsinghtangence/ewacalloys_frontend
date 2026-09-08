"use client";

import { useEffect, useRef, useState } from "react";

function formatValue(value: number, format?: "comma") {
  return format === "comma" ? value.toLocaleString("en-US") : String(value);
}

export function useCountUp(
  target: number,
  { format, duration = 1600 }: { format?: "comma"; duration?: number } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(formatValue(0, format));
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || counted.current) return;
          counted.current = true;

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(formatValue(Math.round(target * eased), format));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, format, duration]);

  return { ref, display };
}
