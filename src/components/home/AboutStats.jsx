"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const characters = Array.from(ABOUT_TEXT);
  const strongCharacterCount = Array.from(STRONG_PREFIX).length;

  useEffect(() => {
    const el = paraRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const chars = el.querySelectorAll(".about-char");
      gsap.fromTo(
        chars,
        { color: "#b4b4b4" },
        {
          color: "#1a1a1a",
          duration: 0.01,
          ease: "none",
          stagger: { each: 0.025 },
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 22%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => context.revert();
  }, []);

  return (
    <p className="about-para" ref={paraRef}>
      <strong>
        {characters.slice(0, strongCharacterCount).map((character, index) => (
          <span className="about-char" key={index}>{character}</span>
        ))}
      </strong>
      {characters.slice(strongCharacterCount).map((character, index) => (
        <span className="about-char" key={strongCharacterCount + index}>{character}</span>
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
