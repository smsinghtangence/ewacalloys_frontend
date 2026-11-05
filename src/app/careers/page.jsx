import Image from "next/image";
import Link from "next/link";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";

export const metadata = {
  title: "Careers | EWAC Alloys",
  description:
    "Explore career paths at EWAC Alloys, from experienced professional roles to early careers.",
};

const CAREER_PATHS = [
  {
    number: "01",
    title: "Experienced professionals",
    applyAs: "experienced",
    description:
      "Bring your experience to work that supports industries, infrastructure and lasting progress.",
    image: "/assets/images/life/career-4.jpg",
    imageAlt: "Colleagues collaborating in a bright, open workplace",
  },
  {
    number: "02",
    title: "Early careers",
    applyAs: "early",
    description:
      "Start your professional journey alongside teams solving real-world materials and engineering challenges.",
    image: "/assets/images/life/career-3.jpg",
    imageAlt: "EWAC colleagues reviewing technical work together",
  },
];

export default function CareersPage() {
  return (
    <main className="careers-page">
      <InnerBanner
        src="/assets/images/life/life-banner.webp"
        mobileSrc="/assets/images/life/life-banner-mobile.webp"
        alt="EWAC colleagues at work"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Careers" />
        </div>
      </section>

      <section className="careers-hero">
        <GearBackdrop className="careers-gear" />
        <div className="container">
          <div className="careers-intro">
            <p className="careers-eyebrow">Careers at EWAC</p>
            <h1>Join Our Team</h1>
            <p className="careers-lead">
              Explore opportunities to grow your skills and contribute to work
              that supports industries, infrastructure, and lasting progress.
            </p>
          </div>

          <div className="careers-grid">
            {CAREER_PATHS.map((path) => (
              <article className="career-card" key={path.number}>
                <div className="career-card-image">
                  <Image
                    src={path.image}
                    alt={path.imageAlt}
                    fill
                    sizes="(max-width: 575px) 100vw, 50vw"
                  />
                  <span className="career-card-number">{path.number}</span>
                </div>
                <div className="career-card-copy">
                  <h2>{path.title}</h2>
                  <p>{path.description}</p>
                  <Link
                    className="career-card-link"
                    href={`/careers/jobs?type=${path.applyAs}`}
                  >
                    Find Jobs
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-next">
        <div className="container careers-next-inner">
          <div>
            <p className="careers-next-label">A place to grow</p>
            <h2>Purpose in your work. Possibility in your future.</h2>
            <p>
              Get to know the people, culture and experiences that make up life
              at EWAC.
            </p>
          </div>
          <Link className="careers-life-link" href="/life-at-ewac">
            Discover life at EWAC <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <ConsultCta welderDecoration />
    </main>
  );
}
