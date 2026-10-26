"use client";

import { useEffect, useState } from "react";
import CardCarousel from "@/components/shared/CardCarousel";
import { EXPORT_REGIONS } from "@/components/about/exportsData";

export default function ExportsExplorer() {
  const [regionId, setRegionId] = useState(EXPORT_REGIONS[0].id);
  const [openAlbum, setOpenAlbum] = useState(null);

  const region = EXPORT_REGIONS.find((r) => r.id === regionId) ?? EXPORT_REGIONS[0];

  useEffect(() => {
    if (!openAlbum) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenAlbum(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openAlbum]);

  return (
    <section className="exports-explorer">
      <div className="container">
        <ul className="exports-tabs" role="tablist">
          {EXPORT_REGIONS.map((r) => (
            <li key={r.id} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={r.id === regionId}
                className={r.id === regionId ? "active" : ""}
                onClick={() => setRegionId(r.id)}
              >
                {r.region}
              </button>
            </li>
          ))}
        </ul>

        <div className="exports-grid">
          {region.albums.map((album) => (
            <button
              type="button"
              key={`${album.country}-${album.title}`}
              className="exports-album"
              onClick={() => setOpenAlbum(album)}
              aria-label={`${album.country}: ${album.title}`}
            >
              <img src={album.images[0]} alt="" />
              <span className="exports-album-country">{album.country}</span>
              <span className="exports-album-hover">
                <strong>{album.country}</strong>
                <span>{album.title}</span>
                <span className="exports-album-arrow">
                  <i className="fas fa-arrow-right" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {openAlbum && (
        <div className="exports-modal" role="dialog" aria-modal="true" aria-label={openAlbum.title}>
          <div className="exports-modal-backdrop" onClick={() => setOpenAlbum(null)} />
          <div className="exports-modal-body">
            <button
              type="button"
              className="exports-modal-close"
              aria-label="Close"
              onClick={() => setOpenAlbum(null)}
            >
              <i className="fas fa-times" />
            </button>
            <CardCarousel
              items={openAlbum.images}
              keyExtractor={(src) => src}
              loop
              dots
              dotsClassName="fac-plant-dots"
              dotClassName=""
              activeDotClassName="is-active"
              renderItem={(src) => (
                <div className="exports-modal-photo">
                  <img src={src} alt={openAlbum.title} />
                </div>
              )}
            />
            <p className="exports-modal-caption">
              <strong>{openAlbum.country}</strong> — {openAlbum.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
