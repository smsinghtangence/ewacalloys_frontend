"use client";

import { useState } from "react";





function buildMobileMenu(
  productCategories,
  services,
  industries,
  navItems,
  contact
) {
  // Products is the only source with a real 2nd nesting level (category ->
  // products); Services/Industries are flat, matching their catalog shape.
  const childrenBySource = {
    "product-categories": productCategories.map((category) => ({
      label: category.name,
      href: `/products/${category.slug}`,
      children: category.products.map((product) => ({
        label: product.name,
        href: `/products/${category.slug}/${product.slug}`,
      })),
    })),
    services: services.map((service) => ({ label: service.name, href: `#${service.slug}` })),
    industries: industries.map((industry) => ({ label: industry.name, href: `/our_industries/${industry.slug}` })),
  };

  return [
    { label: "Home", href: "#" },
    ...navItems.map((item) => {
      if (item.type === "simple-dropdown") {
        return { label: item.label, children: item.links };
      }
      if (item.type === "dropdown") {
        // Cards picked in Strapi win; a product-category card keeps its products as a sub-level when its
        // link matches a category page.
        const sourceChildren = childrenBySource[item.source] ?? [];
        const children =
          item.cards.length > 0
            ? item.cards.map((card) => ({
                label: card.label,
                href: card.href,
                children: sourceChildren.find((child) => child.href === card.href)?.children,
              }))
            : sourceChildren;
        return { label: item.label, children };
      }
      return { label: item.label, href: item.href, newTab: item.newTab };
    }),
    ...(contact?.label ? [{ label: contact.label, href: contact.href }] : []),
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
              <a href={node.href ?? "#"} {...(node.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {node.label}
              </a>
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
  contact,
}) {
  const menu = buildMobileMenu(productCategories, services, industries, navItems, contact);

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
