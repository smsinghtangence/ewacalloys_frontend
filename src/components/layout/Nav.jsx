"use client";

import Link from "next/link";
import SmartLink from "@/components/shared/SmartLink";

import { useState } from "react";

// Dropdowns open on CSS hover. Links navigate without a page reload, so after a click the menu is closed
// (class "is-closed") until the pointer leaves it; otherwise it would stay open over the new page.
// Kept in React state: a class set on the element directly would be wiped by the re-render after navigation.
function useCloseAfterClick() {
  const [closed, setClosed] = useState(null);
  return (label) => ({
    className: `nav-item has-dropdown${closed === label ? " is-closed" : ""}`,
    onClick: (event) => {
      if (event.target.closest(".dropdown a")) setClosed(label);
    },
    onMouseLeave: () => setClosed((current) => (current === label ? null : current)),
  });
}





function MegaDropdown({
  copy,
  cards,
}) {
  const gridModifier = copy.cardVariant === "image" ? "mega-cards-grid--3col" : "";

  return (
    <div className="dropdown dropdown-mega">
      <div className="mega-inner">
        <div className="mega-left-panel">
          <span className="mega-eyebrow">{copy.eyebrow}</span>
          <h3>{copy.title}</h3>
          <p>{copy.description}</p>
          {/* Hidden when there is no label or no real link (see exploreHref in lib/headerSettings.js) */}
          {copy.exploreLabel && copy.exploreHref && (
            <SmartLink href={copy.exploreHref} className="mega-explore-btn">
              {copy.exploreLabel} <i className="fa fa-arrow-right" />
            </SmartLink>
          )}
        </div>
        <div className={`mega-cards-grid ${gridModifier}`}>
          {copy.cardVariant === "image"
            ? cards.map((card) => (
                <SmartLink href={card.href} key={card.label}>
                  <div className="menu-img-wrap">
                    {card.image && <img src={card.image} alt={card.label} />}
                  </div>
                  <div className="menu">
                    <p className="menu-title">{card.label}</p>
                  </div>
                </SmartLink>
              ))
            : cards.map((card) => (
                <SmartLink href={card.href} className="mic" key={card.label}>
                  <div className="mic-icon-industry">
                    <img src={card.image} alt="" />
                  </div>
                  <span className="mic-title">{card.label}</span>
                </SmartLink>
              ))}
        </div>
      </div>
    </div>
  );
}

// Opens external or editor-flagged links in a new tab without leaking window.opener.
function newTabProps(newTab) {
  return newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function SimpleDropdown({ item, itemProps }) {
  return (
    <div {...itemProps}>
      <a href={item.href}>
        {item.label}{" "}
        <span className="nav-arrow">
          <img src="/assets/images/expand-arrow.webp" alt="" />
        </span>
      </a>
      <div className="dropdown dropdown-simple">
        {item.links.map((link) => (
          <SmartLink href={link.href} key={link.label} newTab={link.newTab}>
            {link.label}
          </SmartLink>
        ))}
      </div>
    </div>
  );
}

export default function Nav({
  productCategories,
  services,
  industries,
  navItems,
  showSearch = true,
  contact,
  onSearch,
}) {
  const dropdownProps = useCloseAfterClick();
  const cardsBySource = {
    "product-categories": productCategories.map((category) => ({
      label: category.name,
      image: category.image.url,
      href: `/products/${category.slug}`,
    })),
    services: services.map((service) => ({
      label: service.name,
      image: service.image.url,
      href: service.href,
    })),
    industries: industries.map((industry) => ({
      label: industry.name,
      image: industry.image.url,
      href: industry.href,
    })),
  };
  const cardsForItem = (item) => {
    if (item.source === "product-categories") return cardsBySource[item.source];
    return item.cards.length > 0 ? item.cards : cardsBySource[item.source] ?? [];
  };

  return (
    <nav className="nav">
      {navItems.map((item) =>
        item.type === "simple-dropdown" ? (
          <SimpleDropdown item={item} key={item.label} itemProps={dropdownProps(item.label)} />
        ) : item.type === "dropdown" ? (
          <div key={item.label} {...dropdownProps(item.label)}>
            <a href="#">
              {item.label}{" "}
              <span className="nav-arrow">
                <img src="/assets/images/expand-arrow.webp" alt="" />
              </span>
            </a>
            {/* Product categories always come from the Excel-synced catalog. */}
            <MegaDropdown copy={item} cards={cardsForItem(item)} />
          </div>
        ) : (
          <Link href={item.href} key={item.label} {...newTabProps(item.newTab)}>
            {item.label}
          </Link>
        )
      )}

      {showSearch && (
        <button className="search-btn" type="button" aria-label="Search" onClick={onSearch}>
          <svg viewBox="0 0 24 24">
            <circle cx="10" cy="10" r="6.5" stroke="#d32f2f" strokeWidth="1.8" />
            <line x1="15" y1="15" x2="20" y2="20" stroke="#d32f2f" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {contact?.label && (
        <Link href={contact.href} className="contact-btn">
          {contact.label}
        </Link>
      )}
    </nav>
  );
}
