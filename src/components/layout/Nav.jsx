import Link from "next/link";





function MegaDropdown({
  copy,
  cards,
  gridModifier = "",
  cardVariant = "icon",
}) {
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
          {cardVariant === "image"
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
  productsDropdown,
  servicesDropdown,
  industriesDropdown,
  navLinks,
}) {
  const productCards = productCategories.map((category) => ({
    label: category.name,
    image: category.image.url,
    href: `#${category.slug}`,
  }));
  const serviceCards = services.map((service) => ({
    label: service.name,
    image: service.image.url,
    href: `#${service.slug}`,
  }));
  const industryCards = industries.map((industry) => ({
    label: industry.name,
    image: industry.image.url,
    href: `#${industry.slug}`,
  }));

  return (
    <nav className="nav">
      <div className="nav-item has-dropdown">
        <a href="#">
          Products{" "}
          <span className="nav-arrow">
            <img src="/assets/images/expand-arrow.webp" alt="" />
          </span>
        </a>
        <MegaDropdown copy={productsDropdown} cards={productCards} />
      </div>

      <div className="nav-item has-dropdown">
        <a href="#">
          Services{" "}
          <span className="nav-arrow">
            <img src="/assets/images/expand-arrow.webp" alt="" />
          </span>
        </a>
        <MegaDropdown
          copy={servicesDropdown}
          cards={serviceCards}
          gridModifier="mega-cards-grid--3col"
          cardVariant="image"
        />
      </div>

      <div className="nav-item has-dropdown">
        <a href="#">
          Industries{" "}
          <span className="nav-arrow">
            <img src="/assets/images/expand-arrow.webp" alt="" />
          </span>
        </a>
        <MegaDropdown copy={industriesDropdown} cards={industryCards} />
      </div>

      {navLinks.map((link) => (
        <Link href={link.href} key={link.label}>
          {link.label}
        </Link>
      ))}

      <button className="search-btn" type="button" aria-label="Search">
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
