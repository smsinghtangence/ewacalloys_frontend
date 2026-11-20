"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CONTACT_FIELDS,
  MESSAGE_MAX_LENGTH,
  normalizeContact,
  validateContact,
  validateContactField,
} from "@/lib/contactValidation";

const INVALID_CLASS = " border-[#c0392b]!";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-left text-sm text-[#c0392b]" role="alert">
      {message}
    </p>
  );
}

// Country and Interested-in options come from the Contact Page in Strapi (see lib/contactPage.js).
export default function ContactForm({ countries = [], interests = [], initialValues = {} }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    interestedIn: "",
    message: "",
    ...initialValues,
  });
  const [honeypot, setHoneypot] = useState("");
  // A field shows its error once the visitor has left it or tried to submit.
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const checkField = (field, value) => {
    const message = validateContactField(field, normalizeContact({ [field]: value })[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) checkField(field, value);
  };

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    checkField(field, values[field]);
  };

  const focusFirstInvalid = (errors) => {
    const first = CONTACT_FIELDS.find((field) => errors[field]);
    formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  // Props shared by every field: name, error state and the link to its error message for screen readers.
  const fieldProps = (field) => ({
    name: field,
    value: values[field],
    onChange: update(field),
    onBlur: blur(field),
    "aria-invalid": Boolean(fieldErrors[field]),
    "aria-describedby": fieldErrors[field] ? `contact-${field}-error` : undefined,
  });
  const invalid = (field) => (fieldErrors[field] ? INVALID_CLASS : "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const errors = validateContact(values);
    setTouched(Object.fromEntries(CONTACT_FIELDS.map((field) => [field, true])));
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      focusFirstInvalid(errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...normalizeContact(values), honeypot }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors && Object.keys(payload.fieldErrors).length > 0) {
          setFieldErrors(payload.fieldErrors);
          focusFirstInvalid(payload.fieldErrors);
        }
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
    <form action="#" method="post" onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="row">
        <div className="col-sm-6 contact-field">
          <input
            type="text"
            className={`contact-input${invalid("name")}`}
            placeholder="Name*"
            autoComplete="name"
            maxLength={100}
            required
            {...fieldProps("name")}
          />
          <FieldError id="contact-name-error" message={fieldErrors.name} />
        </div>
        <div className="col-sm-6 contact-field">
          <input
            type="tel"
            className={`contact-input${invalid("phone")}`}
            placeholder="Phone number*"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            required
            {...fieldProps("phone")}
          />
          <FieldError id="contact-phone-error" message={fieldErrors.phone} />
        </div>
      </div>

      <div className="contact-field">
        <input
          type="email"
          className={`contact-input${invalid("email")}`}
          placeholder="Email*"
          autoComplete="email"
          maxLength={254}
          required
          {...fieldProps("email")}
        />
        <FieldError id="contact-email-error" message={fieldErrors.email} />
      </div>

      <div className="row">
        <div className="col-sm-6 contact-field">
          <div className="contact-select-wrap">
            <select className={`contact-select${invalid("country")}`} aria-label="Country" required {...fieldProps("country")}>
              <option value="" disabled>
                Country*
              </option>
              {countries.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <span className="contact-select-arrow">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
          <FieldError id="contact-country-error" message={fieldErrors.country} />
        </div>
        <div className="col-sm-6 contact-field">
          <div className="contact-select-wrap">
            <select className={`contact-select${invalid("interestedIn")}`} aria-label="Interested in" required {...fieldProps("interestedIn")}>
              <option value="" disabled>
                Interested in*
              </option>
              {interests.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <span className="contact-select-arrow">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
          <FieldError id="contact-interestedIn-error" message={fieldErrors.interestedIn} />
        </div>
      </div>

      <div className="contact-field">
        <textarea
          className={`contact-textarea${invalid("message")}`}
          placeholder="Message*"
          maxLength={MESSAGE_MAX_LENGTH}
          required
          {...fieldProps("message")}
        />
        <div className="flex justify-between gap-2">
          <FieldError id="contact-message-error" message={fieldErrors.message} />
          <span className="mt-1 ml-auto text-xs text-[#7c7c7c]">
            {values.message.length}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
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

      {error && <p className="text-left text-base font-medium text-[#c0392b]">{error}</p>}

      <button type="submit" className="contact-submit-btn" disabled={submitting}>
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
