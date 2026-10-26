import Link from "next/link";

export const metadata = {
  title: "Page Not Found | EWAC",
  description: "The page you are looking for does not exist.",
};

// Each spark flies out from the weld point in its own direction (--x / --y), with its own timing.
const SPARKS = [
  { x: -90, y: -120, d: 0, s: 1 },
  { x: -50, y: -150, d: 0.3, s: 0.8 },
  { x: -10, y: -170, d: 0.7, s: 1.1 },
  { x: 40, y: -140, d: 0.15, s: 0.9 },
  { x: 85, y: -115, d: 0.55, s: 1 },
  { x: 120, y: -70, d: 0.9, s: 0.7 },
  { x: -125, y: -60, d: 1.1, s: 0.8 },
  { x: 20, y: -185, d: 1.3, s: 0.9 },
  { x: -70, y: -170, d: 1.5, s: 0.7 },
  { x: 100, y: -150, d: 0.45, s: 0.8 },
];

const QUICK_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/our_industries/steel", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/safety-and-environment", label: "Safety & Environment" },
];

export default function NotFound() {
  return (
    <section className="nf-section">
      <div className="blog-decor-welder nf-welder" aria-hidden="true">
        <img src="/assets/images/blogs/blog-decor-welder.svg" alt="" />
      </div>

      <div className="container">
        <div className="nf-content">
          <div className="nf-digits" role="img" aria-label="404">
            <span>4</span>
            <span className="nf-zero" aria-hidden="true">
              <img src="/assets/images/about-gear1.svg" alt="" />
              {SPARKS.map((spark, index) => (
                <i
                  key={index}
                  className="nf-spark"
                  style={
                    {
                      "--x": `${spark.x}px`,
                      "--y": `${spark.y}px`,
                      "--d": `${spark.d}s`,
                      "--s": spark.s,
                    }
                  }
                />
              ))}
            </span>
            <span>4</span>
          </div>

          <h1 className="nf-title">This weld didn&apos;t hold.</h1>
          <p className="nf-text">
            We tried to repair this page, but it&apos;s nowhere to be found. At EWAC we believe in{" "}
            <strong>&ldquo;Repair rather than Replace&rdquo;</strong> &mdash; so let&apos;s get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-btn nf-btn--red">
              Back to Home
            </Link>
            <Link href="/products" className="nf-btn nf-btn--outline">
              Browse Products
            </Link>
            <Link href="/contact-us" className="nf-link">
              Talk to an expert &rarr;
            </Link>
          </div>

          <ul className="nf-quick" aria-label="Popular pages">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
