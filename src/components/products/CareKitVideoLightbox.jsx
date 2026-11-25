"use client";

import { useEffect, useRef, useState } from "react";

function getEmbedUrl(videoUrl) {
  const url = new URL(videoUrl);
  const videoId = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

export default function CareKitVideoLightbox({ video }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className="ck-video"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play the EWAC Care Kit video"
      >
        <img src={video.thumbnail} alt="" loading="lazy" />
        <span className="ck-play" aria-hidden="true">
          <i className="fas fa-play" />
        </span>
      </button>

      {open && (
        <div className="ck-video-lightbox" onMouseDown={() => setOpen(false)}>
          <div
            className="ck-video-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="EWAC Care Kit video"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              className="ck-video-lightbox-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
            <div className="ck-video-lightbox-frame">
              <iframe
                src={getEmbedUrl(video.url)}
                title="EWAC Care Kit video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
