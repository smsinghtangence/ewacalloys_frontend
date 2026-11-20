"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Footer "sign up for updates" form. Sends the email to /api/newsletter, which saves it in Strapi.
function NewsletterForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sourcePage: pathname, honeypot: form.website.value }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not sign you up. Please try again later.");
      form.reset();
      setStatus("done");
      setMessage("Thanks! You're signed up for updates.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-card">
        <div className="newsletter-intro">
          <span className="newsletter-icon" aria-hidden="true">
            <i className="far fa-paper-plane" />
          </span>
          <div>
            <div className="newsletter-title">sign up for updates:</div>
            <p className="newsletter-sub">Product news, technical tips and event invites.</p>
          </div>
        </div>

        <div className="newsletter-row">
          <label className="newsletter-field">
            <i className="far fa-envelope" aria-hidden="true" />
            <input
              type="email"
              name="email"
              className="newsletter-input"
              placeholder="email address"
              aria-label="Email address"
              aria-invalid={status === "error"}
              aria-describedby="newsletter-message"
              maxLength={254}
              required
              onChange={() => status !== "sending" && setStatus("idle")}
            />
          </label>
          <button type="submit" className="newsletter-btn" disabled={status === "sending"}>
            {status === "sending" ? "sending..." : "submit"}
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        </div>

        {/* Honeypot: hidden from real users, left blank by them; bots tend to fill every field. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}
        />
      </div>

      <p
        id="newsletter-message"
        role="status"
        className="newsletter-terms"
        style={{
          color: status === "error" ? "#c0392b" : "#1e7e34",
          fontWeight: 500,
          // Takes no space until there is a message to show.
          ...(status !== "done" && status !== "error" && { margin: 0 }),
        }}
      >
        {status === "done" || status === "error" ? message : null}
      </p>

      <p className="newsletter-terms">
        by signing up you agree to our <Link href="/terms-conditions">terms</Link>.
      </p>
    </form>
  );
}

// EWAC's official profiles (from ewacalloys.com). An icon is shown only when it has a URL,
// so add the YouTube / X / Instagram addresses here when the company shares them.
const SOCIAL_LINKS = [
  { label: "YouTube", icon: "fa-youtube", href: "" },
  { label: "Facebook", icon: "fa-facebook-f", href: "https://www.facebook.com/EWAC-Alloys-Limited-102572165478711" },
  { label: "X (Twitter)", icon: "fa-x-twitter", href: "" },
  { label: "Instagram", icon: "fa-instagram", href: "" },
  { label: "LinkedIn", icon: "fa-linkedin-in", href: "https://www.linkedin.com/company/5900661" },
];

function FooterLink({ href, children }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

export default function Footer({ columns }) {
  const [openColumn, setOpenColumn] = useState(null);

  return (
    <footer className="ewac-footer">
      <div className="container">
        <div className="footer-top row align-items-center py-4">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="footer-social d-flex">
              {SOCIAL_LINKS.filter((social) => social.href).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`EWAC on ${social.label}`}
                >
                  <i className={`fab ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <Link href="/">
              <img src="/assets/images/footer-logo.svg" alt="EWAC Logo" className="footer-logo" />
            </Link>
          </div>
        </div>

        <div className="footer-links">
          {columns.map((column) => {
            const isOpen = openColumn === column.id;
            return (
              <div className={`footer-col footer-accordion${isOpen ? " active" : ""}`} key={column.id}>
                <h6
                  className="footer-heading"
                  onClick={() => setOpenColumn(isOpen ? null : column.id)}
                >
                  {column.heading}{" "}
                  <span className="footer-accordion-arrow">
                    <img src="/assets/images/expand-arrow.webp" alt="" />
                  </span>
                </h6>
                <ul className="footer-list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="footer-col footer-col--wide">
            <h6 className="footer-heading">EWAC Alloys Limited</h6>
            <p className="footer-about">
              India&apos;s leading manufacturer of welding alloys, brazing products and thermal spray
              solutions. A legacy of innovation since 1962.
            </p>
          </div>

          <div className="footer-col">
            <NewsletterForm />

          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3">
        <p className="mb-0">© 2026 EWAC Alloy. All rights reserved.</p>
      </div>
    </footer>
  );
}
