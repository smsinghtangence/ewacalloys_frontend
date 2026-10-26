"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRY_OPTIONS = [
  "India",
  "South America",
  "Europe",
  "Africa",
  "Middle East",
  "South East Asia",
  "China",
  "Japan",
  "South Korea",
  "Sri Lanka",
  "Bangladesh",
];

const INTERESTED_IN_OPTIONS = [
  "Maintenance & Repair Products",
  "Fabrication Products",
  "Wear Liners & Components",
  "Ceramic Liners & Components",
  "Equipment",
  "Turnkey Solutions",
  "Railways",
  "EWAC Reclamation Facility (ERF)",
];

export default function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    interestedIn: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field) =>
    (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (
      !values.name.trim() ||
      !values.phone.trim() ||
      !values.email.trim() ||
      !values.country ||
      !values.interestedIn ||
      !values.message.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, honeypot }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setError(payload.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/thank-you");
    } catch {
      setError("Could not reach the server. Please try again later.");
      setSubmitting(false);
    }
  };

  return (
    <form action="#" method="post" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6 contact-field">
          <input
            type="text"
            className="contact-input"
            placeholder="Name*"
            required
            value={values.name}
            onChange={update("name")}
          />
        </div>
        <div className="col-sm-6 contact-field">
          <input
            type="tel"
            className="contact-input"
            placeholder="Phone number*"
            required
            value={values.phone}
            onChange={update("phone")}
          />
        </div>
      </div>

      <div className="contact-field">
        <input
          type="email"
          className="contact-input"
          placeholder="Email*"
          required
          value={values.email}
          onChange={update("email")}
        />
      </div>

      <div className="row">
        <div className="col-sm-6 contact-field">
          <div className="contact-select-wrap">
            <select className="contact-select" required value={values.country} onChange={update("country")}>
              <option value="" disabled>
                Country*
              </option>
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <span className="contact-select-arrow">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
        </div>
        <div className="col-sm-6 contact-field">
          <div className="contact-select-wrap">
            <select
              className="contact-select"
              required
              value={values.interestedIn}
              onChange={update("interestedIn")}
            >
              <option value="" disabled>
                Interested in*
              </option>
              {INTERESTED_IN_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <span className="contact-select-arrow">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
        </div>
      </div>

      <div className="contact-field">
        <textarea
          className="contact-textarea"
          placeholder="Message*"
          required
          value={values.message}
          onChange={update("message")}
        />
      </div>

      {/* Honeypot: hidden from real users, left blank by them; bots tend to fill every field. */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {error && <p className="text-left text-sm font-medium text-[#c0392b]">{error}</p>}

      <button type="submit" className="contact-submit-btn" disabled={submitting}>
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
