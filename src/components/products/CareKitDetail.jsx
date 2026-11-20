import Breadcrumb from "@/components/shared/Breadcrumb";
import ConsultCta from "@/components/shared/ConsultCta";
import CareKitSlider from "@/components/products/CareKitSlider";

/** Detail page with its own layout for the EWAC Care Kit (content in careKit.js). */
export default function CareKitDetail({ kit }) {
  const all = [kit.featured, ...kit.items];

  return (
    <>
      <section className="ck-banner">
        <img src={kit.banner} alt="" fetchPriority="high" />
        <div className="container ck-banner-inner">
          <p className="ck-banner-label">{kit.name}</p>
        </div>
      </section>

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb
            current={kit.name}
            trail={[{ label: `${kit.categoryLabel} Product`, href: `/products/${kit.category}` }]}
          />
        </div>
      </section>

      <section className="ck-intro">
        <div className="container">
          <div className="ck-intro-grid">
            <div className="ck-intro-text">
              <h1>{kit.name}</h1>
              {kit.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="ck-intro-media">
              <div className="ck-intro-card">
                <img src={kit.heroImage.src} alt={kit.heroImage.alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ck-contains">
        <div className="container">
          <h2 className="ck-heading">The Care Kit contains :</h2>
          <div className="ck-contains-grid">
            <a
              className="ck-video"
              href={kit.video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch the EWAC Care Kit video on YouTube (opens in a new tab)"
            >
              <img src={kit.video.thumbnail} alt="" loading="lazy" />
              <span className="ck-play" aria-hidden="true">
                <i className="fas fa-play" />
              </span>
            </a>
            <ul className="ck-list">
              {kit.contents.map((item, index) => (
                <li key={item} className={index === 0 ? "is-active" : undefined}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      

      <section className="ck-showcase">
        <div className="container">
          <p className="ck-tagline">{kit.tagline}</p>
          <div className="ck-featured">
            <img src={kit.featured.src} alt={kit.featured.alt} loading="lazy" />
          </div>
          <div className="ck-grid">
            {kit.items.map((item) => (
              <div className="ck-grid-item" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ck-more">
        <div className="container">
          <p className="ck-tagline ck-tagline--dark">{kit.tagline}</p>
          <CareKitSlider items={all} />
        </div>
      </section>

      <ConsultCta welderDecoration />
    </>
  );
}
