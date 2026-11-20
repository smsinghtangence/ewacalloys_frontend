"use client";

import ReactDOM from "react-dom";

// The body text fonts (Frutiger Light + Light Condensed) are needed on every page. Preloading them lets the
// text render in Frutiger straight away instead of Arial first, so the page does not jump when the font arrives.
const FONTS = ["/assets/fonts/FrutigerLTStd-Light.woff2", "/assets/fonts/FrutigerLTStd-LightCn.woff2"];

export default function PreloadFonts() {
  for (const href of FONTS) {
    ReactDOM.preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
  return null;
}
