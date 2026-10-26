"use client";

import { useState } from "react";





function buildMobileMenu(
  productCategories,
  services,
  industries,
  navItems
) {
  // Products is the only source with a real 2nd nesting level (category ->
  // products); Services/Industries are flat, matching their catalog shape.
  const childrenBySource = {
    "product-categories": productCategories.map((category) => ({
      label: category.name,
      href: `#${category.slug}`,
      children: category.products.map((product) => ({
        label: product.name,
        href: `#${product.slug}`,
      })),
    })),
    services: services.map((service) => ({ label: service.name, href: `#${service.slug}` })),
    industries: industries.map((industry) => ({ label: industry.name, href: `#${industry.slug}` })),
  };

  return [
    { label: "Home", href: "#" },
    ...navItems.map((item) =>
      item.type === "dropdown"
        ? { label: item.label, children: childrenBySource[item.source] }
        : { label: item.label, href: item.href }
    ),
    { label: "Contact", href: "/contact-us" },
  ];
}

function MenuList({ nodes, level }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <ul className={level === 0 ? "menu" : "submenu"}>
      {nodes.map((node, index) => {
        if (!node.children) {
          return (
            <li key={node.label}>
              <a href={node.href ?? "#"}>{node.label}</a>
            </li>
          );
        }

        const isOpen = openIndex === index;
        return (
          <li className={`has-submenu${isOpen ? " active" : ""}`} key={node.label}>
            <a
              href={node.href ?? "#"}
              onClick={(event) => {
                event.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }}
            >
              {node.label}
              <span className="arrow">
                <img src="/assets/images/expand-arrow.webp" alt="" />
              </span>
            </a>
            <MenuList nodes={node.children} level={level + 1} />
          </li>
        );
      })}
    </ul>
  );
}

export default function MobileMenu({
  open,
  onClose,
  productCategories,
  services,
  industries,
  navItems,
}) {
  const menu = buildMobileMenu(productCategories, services, industries, navItems);

  return (
    <div className={`mobile-menu${open ? " active" : ""}`} id="mobileMenu">
      <div className="menu-header">
        <h2>
          <img src="/assets/images/logo-m.svg" alt="EWAC" className="why-logo-inline" />
        </h2>
        <button className="close-menu" id="closeMenu" type="button" onClick={onClose}>
          ×
        </button>
      </div>

      <MenuList nodes={menu} level={0} />
    </div>
  );
}
