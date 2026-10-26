import Link from "next/link";
import GearBackdrop from "./GearBackdrop";

export default function ConsultCta({
  gearDecoration = false,
  welderDecoration = false,
}) {
  return (
    <section className="insights-cta">
      {gearDecoration && <GearBackdrop />}
      {welderDecoration && (
        <div className="blog-decor-welder" aria-hidden="true">
          <img src="/assets/images/Welding_Animation.gif" alt="" />
        </div>
      )}
      <div className="container">
        <div className="insights-cta-card d-flex flex-wrap align-items-center justify-content-between">
          <h2 className="insights-cta-heading">
            Ready to solve your
            <br />
            toughest wear challenge?
          </h2>
          <Link href="/contact-us" className="insights-cta-btn">
            Consult our Expert
          </Link>
        </div>
      </div>
    </section>
  );
}
