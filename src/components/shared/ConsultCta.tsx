import Link from "next/link";
import GearBackdrop from "./GearBackdrop";

export default function ConsultCta({ gearDecoration = false }: { gearDecoration?: boolean }) {
  return (
    <section className="insights-cta">
      {gearDecoration && <GearBackdrop />}
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
