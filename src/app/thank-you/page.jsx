import Link from "next/link";
import GearBackdrop from "@/components/shared/GearBackdrop";

export const metadata = {
  title: "Thank You | EWAC",
  description: "Thank you for contacting EWAC. Our team will get back to you shortly.",
};

// Sparks burst from behind the check badge (same keyframes as the 404 page).
const SPARKS = [
  { x: -110, y: -90, d: 0 },
  { x: -70, y: -130, d: 0.2 },
  { x: -25, y: -150, d: 0.5 },
  { x: 25, y: -150, d: 0.1 },
  { x: 70, y: -130, d: 0.4 },
  { x: 110, y: -90, d: 0.7 },
  { x: -135, y: -40, d: 0.9 },
  { x: 135, y: -40, d: 0.3 },
];

const STEPS = [
  { icon: "fa-check", title: "Message received", text: "Your enquiry is safely with our team.", done: true },
  { icon: "fa-search", title: "Reviewed by an expert", text: "We match it to the right specialist, usually within one working day." },
  { icon: "fa-phone-alt", title: "We get in touch", text: "You'll hear back from us by email or phone with next steps." },
];

export default function ThankYouPage() {

  return (
    <>
      <section className="ty-section">
        <GearBackdrop className="ty-gear" />
        <div className="container">
          <div className="ty-content">
            <div className="ty-badge" aria-hidden="true">
              {SPARKS.map((spark, index) => (
                <i
                  key={index}
                  className="nf-spark"
                  style={
                    { "--x": `${spark.x}px`, "--y": `${spark.y}px`, "--d": `${spark.d}s`, "--s": 1 }
                  }
                />
              ))}
              <span className="ty-ring" />
              <span className="ty-ring ty-ring--late" />
              <svg viewBox="0 0 80 80" className="ty-check">
                <circle cx="40" cy="40" r="36" className="ty-check-circle" />
                <path d="M24 41 l11 11 l22 -24" className="ty-check-tick" />
              </svg>
            </div>

            <p className="ty-eyebrow">Weld complete</p>
            <h1 className="ty-title">Thank you!</h1>
            <p className="ty-text">
              Your message has been received. Our team will get back to you shortly &mdash; in the meantime, here&apos;s
              what happens next.
            </p>

            <ol className="ty-steps">
              {STEPS.map((step, index) => (
                <li key={step.title} className={step.done ? "done" : ""} style={{ "--i": index }}>
                  <span className="ty-step-icon">
                    <i className={`fas ${step.icon}`} />
                  </span>
                  <strong>{step.title}</strong>
                  <small>{step.text}</small>
                </li>
              ))}
            </ol>

            <div className="nf-actions">
              <Link href="/" className="nf-btn nf-btn--red">
                Back to Home
              </Link>
              <Link href="/products" className="nf-btn nf-btn--outline">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
