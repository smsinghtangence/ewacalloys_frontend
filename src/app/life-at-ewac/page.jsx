
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GearBackdrop from "@/components/shared/GearBackdrop";
import ConsultCta from "@/components/shared/ConsultCta";
import LifeRewardsSlider from "@/components/life/LifeRewardsSlider";
import LifeGallery from "@/components/life/LifeGallery";
import LifeTestimonials from "@/components/life/LifeTestimonials";

export const metadata = {
  title: "Life at EWAC | EWAC",
  description:
    "Benefits, rewards and recognition, learning and development, and life as an associate at EWAC Alloys.",
};

const BENEFITS = [
  {
    image: "/assets/images/life/career-1.jpg",
    title: "Health and Well Being",
    text: "EWAC truly believes in the health and well-being of its workforce and its families. Our people are at the heart of what we do. Additionally, as per the company schemes, our employees are covered with medical insurance for self and dependents.",
  },
  {
    image: "/assets/images/life/career-4.jpg",
    title: "Annual Health Checkup",
    text: "Employees and spouses are eligible for periodic health checkups at regular intervals. Employee Assistance Program (EAP) provides online medical consultation in association with Practo to address and resolve critical medical issues for Associates and their families.",
  },
  {
    image: "/assets/images/life/career-3.jpg",
    title: "Employee Safety",
    text: "Employee Safety and well-being in these trying times of the Pandemic are of utmost importance. Clear directives from our Global team regarding our COVID protocols have helped us function with caution.",
  },
];

const REWARDS = [
  {
    icon: "fa-clock",
    title: "Annual Compensation Review",
    text: "is a process that is standardized with defined internal governance ensuring fairness, equity, and parity across the Company.",
  },
  {
    icon: "fa-check-circle",
    title: "SPARK Award",
    text: "Globally followed Practice, to recognize your team-members as well as peers.",
  },
  {
    icon: "fa-heart",
    title: "Appreciation Cards",
    text: "For spontaneous recognizing and appreciating good work of peers and teams widely.",
  },
  {
    icon: "fa-star",
    title: "Retiral Programs",
    text: "are designed to honor continuity of service across businesses and help support talent mobility. These include Provident Fund, Superannuation, Gratuity and post retiral medical benefits.",
  },
  {
    icon: "users",
    title: "Long Service Recognition",
    text: "is to recognize and appreciate Management staff who have served the Company for a period of minimum Five years till their retirement.",
  },
];

export default function LifeAtEwacPage() {
  return (
    <>
      <InnerBanner
        src="/assets/images/life/life-banner.jpg"
        mobileSrc="/assets/images/life/life-banner-mobile.webp"
        alt="Life at EWAC"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Life at EWAC" />
        </div>
      </section>

      <section className="life-intro">
        <GearBackdrop className="life-gear" />
        <div className="container">
          <h1 data-aos="fade-up">
            Life at <img src="/assets/images/about/ewac.webp" alt="EWAC" />
          </h1>
          <p data-aos="fade-up" data-aos-delay="100">
            A world of enriched living to build a wholesome life. We believe the focus should be overall and not on
            individual parts! We encourage all Associates to fulfil their personal and social needs and not just their
            professional development. You will find a range of benefits from individual and family benefits, a
            supportive work environment, and other benefits designed in line with your evolving personal needs and
            priorities.
          </p>
        </div>
      </section>

      <section className="life-benefits">
        <div className="container">
          <h2 className="life-heading" data-aos="fade-up">
            Our benefits and beliefs
          </h2>
          <div className="row gy-4 gx-4">
            {BENEFITS.map((benefit, index) => (
              <div className="col-lg-4 col-md-6" key={benefit.title} data-aos="fade-up" data-aos-delay={index * 100}>
                <article className="life-benefit-card" tabIndex={0}>
                  <div className="life-benefit-media">
                    <img src={benefit.image} alt="" />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="life-rewards">
        <div className="container">
          <div className="life-rewards-row">
            <div className="life-rewards-left" data-aos="fade-right">
              <h2>Rewards and Recognition</h2>
              <p>
                To recognise and reward significant (individual and team) contributions and to build a culture of
                appreciation by encouraging EWACians to acknowledge the contributions made by their peers,
                subordinates, and themselves.
              </p>
              <LifeRewardsSlider />
            </div>
            <ul className="life-rewards-list" data-aos="fade-left">
              {REWARDS.map((reward) => (
                <li key={reward.title}>
                  {reward.icon === "users" ? (
                    // Font Awesome Free has no outline "people" glyph, so this one is an inline SVG
                    <svg
                      className="life-reward-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ) : (
                    <i className={`far ${reward.icon}`} aria-hidden="true" />
                  )}
                  <div>
                    <strong>{reward.title}</strong>
                    <p>{reward.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="life-features">
        <div className="container">
          <div className="life-feature" data-aos="fade-up">
            <div className="life-feature-head">
              <h2>
                Enabling and Safe <br />
                Environment
              </h2>
              <div className="life-feature-underline" />
            </div>
            <div className="life-feature-panel life-feature-panel--blue">
              <p>
                A safe, secure, and nondiscriminatory working environment is attained by building awareness and
                educating each Associate about prevention of sexual harassment at workplace as well as following the
                principles of Diversity, Equity, and Inclusiveness (DEI) across the Organization.
              </p>
            </div>
            <div className="life-feature-img">
              <img src="/assets/images/life/career-4.jpg" alt="Associates in a collaborative office space" />
            </div>
          </div>

          <div className="life-feature life-feature--reverse" data-aos="fade-up">
            <div className="life-feature-head">
              <h2>
                Global Associate <br />
                Survey
              </h2>
              <div className="life-feature-underline" />
            </div>
            <div className="life-feature-panel life-feature-panel--red">
              <p>
                This is a platform which enables Associates to voice their feedback about the Organizational
                practices as well as helps the Company to understand the Associate&apos;s expectation.
              </p>
            </div>
            <div className="life-feature-img">
              <img src="/assets/images/life/career-5.jpg" alt="Typing on a laptop" />
            </div>
          </div>

          <div className="life-feature" data-aos="fade-up">
            <div className="life-feature-head">
              <h2>
                Learning and <br />
                Development
              </h2>
              <div className="life-feature-underline" />
            </div>
            <div className="life-feature-panel life-feature-panel--blue">
              <ol>
                <li>
                  Hands-on and &lsquo;best in the industry&rsquo; sales &amp; application training program of 45 days
                  for all new joiners at the plant giving exposure to various applications.
                </li>
                <li>Soft skills and behavioural training program.</li>
              </ol>
            </div>
            <div className="life-feature-img">
              <img src="/assets/images/life/career-6.jpg" alt="A team at a training session" />
            </div>
          </div>
        </div>
      </section>

      <LifeGallery />

      <LifeTestimonials />

      <ConsultCta welderDecoration />
    </>
  );
}
