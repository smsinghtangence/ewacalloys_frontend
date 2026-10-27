import Link from "next/link";





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
          <a href={copy.exploreHref} className="mega-explore-btn">
            {copy.exploreLabel} <i className="fa fa-arrow-right" />
          </a>
        </div>
        <div className={`mega-cards-grid ${gridModifier}`}>
          {copy.cardVariant === "image"
            ? cards.map((card) => (
                <a href={card.href} key={card.label}>
                  <div className="menu-img-wrap">
                    <img src={card.image} alt={card.label} />
                  </div>
                  <div className="menu">
                    <p className="menu-title">{card.label}</p>
                  </div>
                </a>
              ))
            : cards.map((card) => (
                <a href={card.href} className="mic" key={card.label}>
                  <div className="mic-icon-industry">
                    <img src={card.image} alt="" />
                  </div>
                  <span className="mic-title">{card.label}</span>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default function Nav({
  productCategories,
  services,
  industries,
  navItems,
  onSearch,
}) {
  const cardsBySource = {
    "product-categories": productCategories.map((category) => ({
      label: category.name,
      image: category.image.url,
      href: `#${category.slug}`,
    })),
    services: services.map((service) => ({
      label: service.name,
      image: service.image.url,
      href: `#${service.slug}`,
    })),
    industries: industries.map((industry) => ({
      label: industry.name,
      image: industry.image.url,
      href: `/our_industries/${industry.slug}`,
    })),
  };

  return (
    <nav className="nav">
      {navItems.map((item) =>
        item.type === "dropdown" ? (
          <div className="nav-item has-dropdown" key={item.label}>
            <a href="#">
              {item.label}{" "}
              <span className="nav-arrow">
                <img src="/assets/images/expand-arrow.webp" alt="" />
              </span>
            </a>
            <MegaDropdown copy={item} cards={cardsBySource[item.source]} />
          </div>
        ) : (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        )
      )}

      <button className="search-btn" type="button" aria-label="Search" onClick={onSearch}>
        <svg viewBox="0 0 24 24">
          <circle cx="10" cy="10" r="6.5" stroke="#d32f2f" strokeWidth="1.8" />
          <line x1="15" y1="15" x2="20" y2="20" stroke="#d32f2f" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <Link href="/contact-us" className="contact-btn">
        Contact
      </Link>
    </nav>
  );
}
