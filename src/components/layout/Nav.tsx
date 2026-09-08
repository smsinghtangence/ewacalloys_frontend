import Link from "next/link";
import type { CatalogIndustry, CatalogProductCategory, CatalogService } from "@/lib/catalog";

type MegaCard = { label: string; image: string; href: string };

function MegaDropdown({
  eyebrow,
  title,
  description,
  cards,
  gridModifier = "",
  cardVariant = "icon",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cards: MegaCard[];
  gridModifier?: string;
  cardVariant?: "icon" | "image";
}) {
  return (
    <div className="dropdown dropdown-mega">
      <div className="mega-inner">
        <div className="mega-left-panel">
          <span className="mega-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <a href="#" className="mega-explore-btn">
            Explore All <i className="fa fa-arrow-right" />
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
}: {
  productCategories: CatalogProductCategory[];
  services: CatalogService[];
  industries: CatalogIndustry[];
}) {
  const productCards: MegaCard[] = productCategories.map((category) => ({
    label: category.name,
    image: category.image.url,
    href: `#${category.slug}`,
  }));
  const serviceCards: MegaCard[] = services.map((service) => ({
    label: service.name,
    image: service.image.url,
    href: `#${service.slug}`,
  }));
  const industryCards: MegaCard[] = industries.map((industry) => ({
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
        <MegaDropdown
          eyebrow="What We Make"
          title={
            <>
              Our
              <br />
              Products
            </>
          }
          description="High-performance welding consumables and wear protection solutions for demanding environments."
          cards={productCards}
        />
      </div>

      <div className="nav-item has-dropdown">
        <a href="#">
          Services{" "}
          <span className="nav-arrow">
            <img src="/assets/images/expand-arrow.webp" alt="" />
          </span>
        </a>
        <MegaDropdown
          eyebrow="What We Do"
          title={
            <>
              Our
              <br />
              Services
            </>
          }
          description="Comprehensive on-site and in-house solutions across India's critical industrial sectors."
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
        <MegaDropdown
          eyebrow="What We Serve"
          title={
            <>
              Industries
              <br />
              We Serve
            </>
          }
          description="Decades of expertise across India's most demanding industrial sectors."
          cards={industryCards}
        />
      </div>

      <Link href="/about">About</Link>
      <Link href="/insights">Insights</Link>
      <a href="#">Careers</a>

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
