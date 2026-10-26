"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const AOS_OPTIONS = { duration: 700, easing: "ease-out-cubic", once: false, mirror: true, offset: 80 };

/** Loads the self-hosted AOS script and (re)initialises it on every client-side navigation. */
export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Elements for the new route are mounted by now; pick up their data-aos attributes.
    window.AOS?.refreshHard();
  }, [pathname]);

  return (
    <Script
      src="/assets/vendor/aos/aos.js"
      strategy="afterInteractive"
      onReady={() => window.AOS?.init(AOS_OPTIONS)}
    />
  );
}
