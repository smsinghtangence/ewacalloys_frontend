"use client";

import { useEffect, useRef } from "react";
import { useCountUp } from "@/components/shared/useCountUp";

const ABOUT_TEXT =
  "EWAC was started as a joint venture between Larsen & Toubro Limited, India & Eutectic Castolin Group, Switzerland, in 1962. In the year 2011, EWAC Alloys Limited became a wholly owned subsidiary of Larsen & Toubro Limited (L&T). Subsequently, in 2018, EWAC was acquired by Colfax, USA. EWAC Alloys Limited has been a leader in Maintenance and Repair in the Indian Welding Industry. The company manufactures and sells cutting-edge welding products, kits, and accessories. EWAC exports products to over 50 countries across South America, Europe, Africa, ME, SEA, China, Japan, South Korea, Sri Lanka, and Bangladesh.";

const STRONG_PREFIX = "EWAC was started as a joint venture between Larsen & Toubro Limited";

const STATS = [
  { icon: "/assets/images/icon1.svg", target: 7000, format: "comma", label: "Customers" },
  { icon: "/assets/images/icon2.svg", target: 64, label: "Years" },
  { icon: "/assets/images/icon3.svg", target: 500, label: "Products" },
  { icon: "/assets/images/icon4.svg", target: 9, label: "Industries" },
];

function StatItem({ icon, target, format, label }) {
  const { ref, display } = useCountUp(target, { format });
  return (
    <div className="stat-item">
      <img src={icon} alt="" />
      <div className="stat-number">
        <span className="count" ref={ref}>
          {display}
        </span>
        +
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function AboutParagraph() {
  const paraRef = useRef(null);
  const words = ABOUT_TEXT.split(" ");
  const strongWordCount = STRONG_PREFIX.split(" ").length;

  useEffect(() => {
    const el = paraRef.current;
    if (!el) return;

    const wordSpans = Array.from(el.querySelectorAll(".about-word"));

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // progress 0 -> 1 as the paragraph travels from "just entering" to "just leaving" the viewport
      const total = rect.height + viewportHeight;
      const traveled = viewportHeight - rect.top;
      const progress = Math.min(Math.max(traveled / total, 0), 1);

      const revealCount = Math.floor(progress * wordSpans.length);
      wordSpans.forEach((span, index) => {
        span.style.color = index < revealCount ? "#1a1a1a" : "#B4B4B4";
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p className="about-para" ref={paraRef}>
      {words.map((word, index) => (
        <span className="about-word" key={index} style={{ color: "#B4B4B4" }}>
          {index < strongWordCount ? <strong>{word}</strong> : word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export default function AboutStats() {
  return (
    <section className="about-section" id="about-stats">
      <div className="about-gear-bg">
        <img src="/assets/images/about-gear1.svg" alt="img" className="gear1" />
        <img src="/assets/images/about-gear2.svg" alt="img" className="gear2" />
        <img src="/assets/images/about-gear2.svg" alt="img" className="gear3" />
      </div>
      <div className="about-men-bg">
        <img src="/assets/images/Welding_Animation.gif" alt="img" />
      </div>

      <div className="container">
        <AboutParagraph />
        <div className="stats-row">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
