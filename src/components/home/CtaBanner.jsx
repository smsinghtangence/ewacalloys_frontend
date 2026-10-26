import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-overlay" />
      <div className="container">
        <div className="w-full md:w-7/12 lg:w-1/2">
          <h2 className="cta-heading">
            Ready to solve your <br />
            toughest wear challenge?
          </h2>
          <p className="cta-sub">Talk to our technical team &mdash; free consultation for new requirements</p>
          <Link href="/contact-us" className="cta-btn">
            Consult our Expert
          </Link>
        </div>
      </div>
    </section>
  );
}
