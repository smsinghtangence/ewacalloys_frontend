"use client";

import { useState } from "react";

/** R&D Centre facility tabs: red tabs like the Exports page, then a photo beside the selected facility's text. */
export default function RdFacilities({ facilities }) {
  const [activeId, setActiveId] = useState(facilities[0].id);
  const facility = facilities.find((f) => f.id === activeId) ?? facilities[0];

  return (
    <section className="exports-explorer rd-facilities">
      <div className="container">
        <ul className="exports-tabs" role="tablist">
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
