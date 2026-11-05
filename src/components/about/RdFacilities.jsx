"use client";

import { useState } from "react";

/**
 * R&D Centre facility tabs: red tabs like the Exports page, then a photo beside the selected facility's text.
 * On phones the tabs are replaced by a dropdown (the tabs wrap into an untidy block at that width).
 */
export default function RdFacilities({ facilities }) {
  const [activeId, setActiveId] = useState(facilities[0].id);
  const facility = facilities.find((f) => f.id === activeId) ?? facilities[0];

  return (
    <section className="exports-explorer rd-facilities">
      <div className="container">
        <div className="rd-dropdown-wrap">
          <label htmlFor="rd-facility-select" className="visually-hidden">
            Choose a facility
          </label>
          <select
            id="rd-facility-select"
            className="rd-dropdown"
            value={activeId}
            onChange={(event) => setActiveId(event.target.value)}
          >
            {facilities.map((f) => (
              <option value={f.id} key={f.id}>
                {f.title}
              </option>
            ))}
          </select>
          <span className="rd-dropdown-arrow" aria-hidden="true">
            <i className="fas fa-chevron-down" />
          </span>
        </div>

        <ul className="exports-tabs rd-tabs" role="tablist">
          {facilities.map((f) => (
            <li key={f.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`rd-${f.id}-tab`}
                aria-controls={`rd-${f.id}`}
                aria-selected={f.id === activeId}
                className={f.id === activeId ? "active" : ""}
                onClick={() => setActiveId(f.id)}
              >
                {f.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="rd-pane" role="tabpanel" id={`rd-${facility.id}`} aria-labelledby={`rd-${facility.id}-tab`} key={facility.id}>
          <div className="rd-pane-img">
            <img src={facility.image} alt={facility.title} />
          </div>
          <div className="rd-pane-text">
            <h2>{facility.title}</h2>
            {facility.text && <p>{facility.text}</p>}
            {facility.items && (
              <ul>
                {facility.items.map((item) => (
                  <li key={item.label ?? item}>
                    {item.label ? (
                      <>
                        <strong>{item.label}:</strong> {item.text}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
