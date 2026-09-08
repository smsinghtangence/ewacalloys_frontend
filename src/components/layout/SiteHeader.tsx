"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import Overlay from "./Overlay";
import type { CatalogIndustry, CatalogProductCategory, CatalogService } from "@/lib/catalog";
import type { HeaderSettings } from "@/lib/headerSettings";

export default function SiteHeader({
  productCategories,
  services,
  industries,
  headerSettings,
}: {
  productCategories: CatalogProductCategory[];
  services: CatalogService[];
  industries: CatalogIndustry[];
  headerSettings: HeaderSettings;
}) {
  const topBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateStickyState = () => {
      const triggerPoint = topBarRef.current?.offsetHeight ?? 0;
      setIsSticky(window.scrollY > triggerPoint);
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", updateStickyState);
    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", updateStickyState);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("header-fixed", isSticky);
  }, [isSticky]);

  useEffect(() => {
    const updateDropdownTop = () => {
      const header = headerRef.current;
      if (!header) return;
      // When sticky, .header.is-sticky plays a slide-down entrance animation
      // (top: -height -> 0), so reading getBoundingClientRect() right as it
      // flips would catch a mid-animation value. offsetHeight is unaffected
      // by that animation and the sticky header always lands at top:0.
      const bottom = isSticky ? header.offsetHeight : header.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty("--dropdown-top", `${bottom}px`);
    };

    updateDropdownTop();
    window.addEventListener("resize", updateDropdownTop);
    return () => window.removeEventListener("resize", updateDropdownTop);
  }, [isSticky]);

  return (
    <>
      <div ref={topBarRef}>
        <TopBar {...headerSettings.topBar} />
      </div>

      <header className={`header${isSticky ? " is-sticky" : ""}`} ref={headerRef}>
        <div className="logo">
          <a href="/">
            <img src="/assets/images/ewac.png" alt="EWAC" />
          </a>
        </div>

        <Nav
          productCategories={productCategories}
          services={services}
          industries={industries}
          productsDropdown={headerSettings.productsDropdown}
          servicesDropdown={headerSettings.servicesDropdown}
          industriesDropdown={headerSettings.industriesDropdown}
          navLinks={headerSettings.navLinks}
        />

        <button
          className="menu-btn"
          id="openMenu"
          type="button"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
      </header>

      <Overlay active={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        productCategories={productCategories}
        services={services}
        industries={industries}
        navLinks={headerSettings.navLinks}
      />
    </>
  );
}
