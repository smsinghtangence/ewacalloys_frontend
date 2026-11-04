"use client";

import { useCountUp } from "@/components/shared/useCountUp";

function Stat({ icon, target, label }) {
  const { ref, display } = useCountUp(target);
  return (
    <div className="rw-stat erf-stat">
      <img src={icon} alt="" />
      <strong>
        <span ref={ref}>{display}</span>+
      </strong>
      <span>{label}</span>
    </div>
  );
}

/** "Expertise through experience" numbers on the ERF page; they count up when scrolled into view. */
export default function ErfStats({ stats }) {
  return (
    <div className="rw-stats erf-stats">
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
