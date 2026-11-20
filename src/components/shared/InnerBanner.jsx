// heading: the page's H1 for pages whose visible title is part of the banner image
// (visually hidden, read by search engines and screen readers). Leave it out when the page has its own <h1>.
export default function InnerBanner({ src, mobileSrc, alt, className = "", heading, children }) {
  return (
    <section className={`inner-banner ${className}`.trim()}>
      {heading && <h1 className="sr-only">{heading}</h1>}
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img src={src} alt={alt} fetchPriority="high" />
      </picture>
      {children}
    </section>
  );
}
