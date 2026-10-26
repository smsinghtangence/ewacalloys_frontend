export default function InnerBanner({ src, mobileSrc, alt, className = "", children }) {
  return (
    <section className={`inner-banner ${className}`.trim()}>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img src={src} alt={alt} />
      </picture>
      {children}
    </section>
  );
}
