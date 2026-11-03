"use client";

import Image from "next/image";
import { useState } from "react";

export default function BoardDirectors({ directors }) {
  const [openDirector, setOpenDirector] = useState(null);

  return (
    <div className="board-grid">
      {directors.map((director, index) => {
        const isOpen = openDirector === director.name;
        const bioId = `board-bio-${index}`;

        return (
          <article
            className={`board-card${isOpen ? " is-open" : ""}`}
            key={director.name}
          >
            <div className="board-photo">
              <Image
                src={`/assets/images/company-info/${director.image}`}
                alt={director.name}
                fill
                sizes="(max-width: 575px) 34vw, 36vw"
              />
            </div>
            <div className="board-info">
              <h2>{director.name}</h2>
              <p className="board-role">{director.role}</p>
              <p className="board-bio" id={bioId} hidden={!isOpen}>
                {director.bio}
              </p>
              <button
                type="button"
                className="board-bio-toggle"
                aria-expanded={isOpen}
                aria-controls={bioId}
                onClick={() => setOpenDirector(isOpen ? null : director.name)}
              >
                {isOpen ? "Close Bio" : "View Bio"}
                <span aria-hidden="true">{isOpen ? "−" : "→"}</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
