"use client";

// What the visitor sees on /careers/jobs: the two tabs, the inputs and the error messages.
// The field list and the code that sends the application live in src/app/careers/jobs/page.jsx.

import { useActionState, useState, startTransition } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CareerApplicationForm({ forms, initialType, maxResumeMb, action }) {
  const [type, setType] = useState(forms[initialType] ? initialType : "experienced");

  return (
    <div className="career-apply-card">
      <div className="career-apply-tabs" role="tablist">
        {Object.entries(forms).map(([key, form]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={key === type}
            className={key === type ? "active" : ""}
            onClick={() => setType(key)}
          >
            {form.tab}
          </button>
        ))}
      </div>

      {/* `key` gives each tab its own blank form */}
      <ApplicationForm key={type} type={type} fields={forms[type].fields} maxResumeMb={maxResumeMb} action={action} />
    </div>
  );
}

function ApplicationForm({ type, fields, maxResumeMb, action }) {
  // `state` is what submitApplication (page.jsx) returned: { error, fieldErrors }.
  const [state, submit, pending] = useActionState(action, {});
  const [clientError, setClientError] = useState(null);
  const error = clientError ?? state.error;
  const fieldErrors = clientError ? {} : (state.fieldErrors ?? {});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Quick checks in the browser, so obvious mistakes don't need a trip to the server.
    const missing = fields.find((field) => {
      const value = formData.get(field.name);
      return field.required && (field.type === "file" ? !value?.size : !String(value ?? "").trim());
    });
    if (missing) return setClientError(`Please fill in ${missing.label}.`);
    if (!EMAIL_PATTERN.test(String(formData.get("email")).trim())) return setClientError("Please enter a valid email address.");
    if (formData.get("resume")?.size > maxResumeMb * 1024 * 1024) {
      return setClientError(`Resume must be smaller than ${maxResumeMb} MB.`);
    }

    setClientError(null);
    formData.append("applicationType", type);
    // Calling the action here (not via <form action>) keeps the typed values if the server returns errors.
    startTransition(() => submit(formData));
  };

  return (
    <form className="career-apply-form" onSubmit={handleSubmit} noValidate>
      <div className="career-apply-grid">
        {fields.map((field) => (
          <div className={`career-apply-field${field.type === "textarea" ? " is-wide" : ""}`} key={field.name}>
            <label htmlFor={`apply-${field.name}`}>
              {field.label}
              {field.required && <span className="contact-required">*</span>}
            </label>
            <FieldInput field={field} maxResumeMb={maxResumeMb} />
            {fieldErrors[field.name] && (
              <p className="mt-1 text-left text-sm text-[#c0392b]" role="alert">
                {fieldErrors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Honeypot: hidden from real users, left blank by them; bots tend to fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {error && <p className="text-left text-base font-medium text-[#c0392b]">{error}</p>}

      <button type="submit" className="contact-submit-btn" disabled={pending}>
        {pending ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}

function FieldInput({ field, maxResumeMb }) {
  const props = { id: `apply-${field.name}`, name: field.name, required: field.required, maxLength: field.max };

  if (field.type === "dob") return <DobInput field={field} />;

  if (field.type === "textarea") return <textarea className="contact-textarea" {...props} />;

  if (field.type === "file") {
    return (
      <>
        <input type="file" className="contact-input career-apply-file" accept=".pdf,.doc,.docx" {...props} />
        <small className="career-apply-hint">PDF, DOC or DOCX, up to {maxResumeMb} MB</small>
      </>
    );
  }

  return <input type={field.type ?? "text"} className="contact-input" min={field.type === "number" ? 0 : undefined} {...props} />;
}

// Day / Month / Year dropdowns; the hidden input sends them to the server as one "YYYY-MM-DD" value.
function DobInput({ field }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => thisYear - 15 - i); // applicants aged 15 to 75
  const daysInMonth = month ? new Date(year || 2000, Number(month), 0).getDate() : 31;
  const pad = (n) => String(n).padStart(2, "0");
  const value = day && month && year ? `${year}-${pad(month)}-${pad(day)}` : "";

  // Picking a shorter month (e.g. February) clears a day that no longer exists.
  const changeMonthOrYear = (setter) => (event) => {
    setter(event.target.value);
    setDay("");
  };

  const dropdown = (id, label, current, onChange, options) => (
    <div className="contact-select-wrap">
      <select id={id} className="contact-select" aria-label={label} value={current} onChange={onChange}>
        <option value="">{label}</option>
        {options}
      </select>
      <span className="contact-select-arrow" aria-hidden="true">
        <i className="fas fa-chevron-down" />
      </span>
    </div>
  );

  return (
    <div className="career-apply-dob">
      {dropdown(`apply-${field.name}`, "Day", day, (event) => setDay(event.target.value),
        Array.from({ length: daysInMonth }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>))}
      {dropdown("apply-dob-month", "Month", month, changeMonthOrYear(setMonth),
        MONTHS.map((name, i) => <option key={name} value={i + 1}>{name}</option>))}
      {dropdown("apply-dob-year", "Year", year, changeMonthOrYear(setYear),
        years.map((y) => <option key={y} value={y}>{y}</option>))}
      <input type="hidden" name={field.name} value={value} />
    </div>
  );
}
