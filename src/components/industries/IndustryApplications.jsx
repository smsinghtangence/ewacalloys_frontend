"use client";

import { useState } from "react";

function Chevron({ open }) {
  return (
    <span className={`ind-acc-chevron${open ? " open" : ""}`} aria-hidden="true">
      <i className="fas fa-chevron-down" />
    </span>
  );
}

function ApplicationBody({ app }) {
  const [before, after] = app.images;
  const hasPair = app.images.length === 2;

  return (
    <div className={`ind-acc-body${app.images.length > 0 ? " has-images" : ""}`}>
      <div className="ind-acc-text">
        {app.text.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>

      {hasPair && (
        <div className="ind-acc-compare">
          <figure>
            <img src={before} alt={`${app.title} - before`} />
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img src={after} alt={`${app.title} - after`} />
            <figcaption>After</figcaption>
          </figure>
        </div>
      )}

      {!hasPair && app.images.length > 0 && (
        <div className="ind-acc-gallery">
          {app.images.map((src) => (
            <img key={src} src={src} alt={app.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function IndustryApplications({ applications }) {
  const [sectionOpen, setSectionOpen] = useState(true);
  const [openItems, setOpenItems] = useState(applications.length > 0 ? [0] : []);

  const toggleItem = (index) =>
    setOpenItems((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));

  if (applications.length === 0) return null;

  return (
    <section className="ind-applications">
      <div className="container">
        <button
          type="button"
          className="ind-acc-section-head"
          aria-expanded={sectionOpen}
          onClick={() => setSectionOpen((open) => !open)}
        >
          <span>Applications</span>
          <Chevron open={sectionOpen} />
        </button>

        {sectionOpen &&
          applications.map((app, index) => {
            const open = openItems.includes(index);
            return (
              <div className="ind-acc-item" key={`${app.title}-${index}`}>
                <button type="button" className="ind-acc-head" aria-expanded={open} onClick={() => toggleItem(index)}>
                  <span>{app.title}</span>
                  <Chevron open={open} />
                </button>
                {open && <ApplicationBody app={app} />}
              </div>
            );
          })}
      </div>
    </section>
  );
}
