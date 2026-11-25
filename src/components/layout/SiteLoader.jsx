"use client";

import { useEffect, useState } from "react";

// Longest the loader may stay up. It used to wait for the window "load" event (every image on the page),
// which kept it on screen for seconds on image-heavy pages like /products; images now keep loading behind it.
const MAX_WAIT_MS = 1500;
// Matches the fade-out transition on .site-loader.is-hidden in globals.css.
const FADE_MS = 500;

/**
 * Full-screen loader shown on the first visit until the page's fonts and layout are ready.
 * It is rendered in the server HTML, so it is visible straight away, and fades out as soon as the web fonts
 * have loaded (so text does not jump), the page has fully loaded, or MAX_WAIT_MS has passed — whichever is first.
 * Client-side navigation between pages does not show it again.
 */
export default function SiteLoader() {
  const [stage, setStage] = useState("visible"); // visible → hiding → gone

  useEffect(() => {
    let fadeTimer;
    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      setStage("hiding");
      fadeTimer = setTimeout(() => setStage("gone"), FADE_MS);
    };

    if (document.readyState === "complete") {
      hide();
      return () => clearTimeout(fadeTimer);
    }

    window.addEventListener("load", hide, { once: true });
    document.fonts?.ready.then(() => requestAnimationFrame(hide));
    const maxTimer = setTimeout(hide, MAX_WAIT_MS);
    return () => {
      done = true;
      window.removeEventListener("load", hide);
      clearTimeout(maxTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (stage === "gone") return null;

  return (
    <div
      className={`site-loader${stage === "hiding" ? " is-hidden" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="site-loader__inner">
        <img src="/assets/images/logo-m.svg" alt="EWAC" className="site-loader__logo" width="147" height="64" />
        <span className="site-loader__ring" aria-hidden="true" />
      </div>
    </div>
  );
}
