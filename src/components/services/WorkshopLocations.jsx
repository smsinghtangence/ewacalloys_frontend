"use client";

import { useState } from "react";

/**
 * Workshop list next to the India map. Selecting an address (or a pin) turns that pin red and opens the
 * popup beside it. Each location: { state, address, x, y, stats: [{ label, value }] } where x / y are the
 * pin position in % of the map image (x from the left, y from the top; the pin points at that spot).
 */
export default function WorkshopLocations({ locations, mapSrc }) {
  const [active, setActive] = useState(0);
  const current = locations[active];

  return (
    <div className="tk-workshops">
      <ul className="tk-workshop-list">
        {locations.map((location, index) => (
          <li key={`${location.state}-${index}`}>
            <button
              type="button"
              className={`tk-workshop${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              <strong>{location.state}</strong>
              <span>{location.address}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="tk-map">
        <img src={mapSrc} alt="Map of India showing EWAC workshop locations" />

        {locations.map((location, index) => (
          <button
            type="button"
            key={`pin-${location.state}-${index}`}
            className={`tk-pin${index === active ? " is-active" : ""}`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => setActive(index)}
            aria-label={`${location.state} workshop`}
            aria-pressed={index === active}
          >
            <svg viewBox="0 0 26 34" width="26" height="34" aria-hidden="true">
              <path d="M13 0C5.8 0 0 5.8 0 13c0 9.6 13 21 13 21s13-11.4 13-21C26 5.8 20.2 0 13 0z" />
              <circle cx="13" cy="13" r="4.6" />
            </svg>
            <span className="tk-pin-base" />
          </button>
        ))}

        {current && (
          <div
            key={active}
            className={`tk-map-pop ${current.x < 27 ? "tk-map-pop--right" : "tk-map-pop--left"}`}
            style={{ left: `${current.x}%`, top: `${current.y}%` }}
            role="status"
          >
            <div className="tk-map-pop-title">
              <strong>{current.state}</strong>
              <span>Infographic</span>
            </div>
            <dl className="tk-map-pop-stats">
              {current.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
