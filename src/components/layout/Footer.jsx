"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer({ columns }) {
  const [openColumn, setOpenColumn] = useState(null);

  return (
    <footer className="ewac-footer">
      <div className="container">
        <div className="footer-top row align-items-center py-4">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="footer-social d-flex">
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" aria-label="X (Twitter)">
                <i className="fab fa-x-twitter" />
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
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
                      <a href={link.href}>{link.label}</a>
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
            <form className="newsletter-form" action="#" method="post">
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
                      required
                    />
                  </label>
                  <button type="submit" className="newsletter-btn">
                    submit
                    <i className="fas fa-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <p className="newsletter-terms">
                by signing up you agree to our <a href="#">terms</a>.
              </p>
            </form>

          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3">
        <p className="mb-0">© 2026 EWAC Alloy. All rights reserved.</p>
      </div>
    </footer>
  );
}
