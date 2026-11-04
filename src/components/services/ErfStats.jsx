"use client";

import { useCountUp } from "@/components/shared/useCountUp";

function Stat({ icon, target, label, suffix = "+" }) {
  const { ref, display } = useCountUp(target);
  return (
    <div className="rw-stat erf-stat">
      {icon && <img src={icon} alt="" />}
      <strong>
        <span ref={ref}>{display}</span>
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/** Count-up numbers (ERF "Expertise through experience", Trainings "EWAC Institute"); they count up when scrolled into view. */
export default function ErfStats({ stats, className = "erf-stats" }) {
  return (
    <div className={`rw-stats ${className}`}>
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
