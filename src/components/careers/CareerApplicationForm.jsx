"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_MB = 5;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Fields shared by both forms come first; `required` fields are marked with *.
const COMMON_FIELDS = [
  { name: "fullName", label: "Full Name", required: true },
  { name: "email", label: "Personal Email ID", type: "email", required: true },
  { name: "dateOfBirth", label: "Date of Birth", type: "dob", required: true },
  { name: "mobile", label: "Mobile Number", type: "tel", required: true },
];

const FORMS = {
  experienced: {
    tab: "Experienced Professionals",
    fields: [
      ...COMMON_FIELDS,
      { name: "currentCompany", label: "Current Company", required: true },
      { name: "currentDesignation", label: "Current Designation", required: true },
      { name: "totalExperience", label: "Total Experience (Years)", type: "number", required: true },
      { name: "currentLocation", label: "Current Location", required: true },
      { name: "preferredLocation", label: "Preferred Location", required: true },
      { name: "resume", label: "Resume Upload", type: "file", required: true },
      { name: "noticePeriod", label: "Notice Period" },
      { name: "expectedCtc", label: "Expected CTC" },
    ],
  },
  early: {
    tab: "Early Careers",
    fields: [
      ...COMMON_FIELDS,
      { name: "highestQualification", label: "Highest Qualification", required: true },
      { name: "specialization", label: "Specialization / Branch", required: true },
      { name: "currentLocation", label: "Current Location", required: true },
      { name: "preferredLocation", label: "Preferred Location", required: true },
      { name: "resume", label: "Resume Upload", type: "file", required: true },
      { name: "graduationYear", label: "Year of Graduation", type: "number" },
      { name: "address", label: "Address for Communication", type: "textarea" },
    ],
  },
};

export default function CareerApplicationForm({ initialType = "experienced" }) {
  const [type, setType] = useState(FORMS[initialType] ? initialType : "experienced");

  return (
    <div className="career-apply-card">
      <div className="career-apply-tabs" role="tablist">
        {Object.entries(FORMS).map(([key, form]) => (
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
      <ApplicationForm key={type} type={type} fields={FORMS[type].fields} />
    </div>
  );
}

function ApplicationForm({ type, fields }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const missing = fields.find((field) => {
      const value = formData.get(field.name);
      return field.required && (field.type === "file" ? !value?.size : !String(value ?? "").trim());
    });
    if (missing) {
      setError(`Please fill in ${missing.label}.`);
      return;
    }
    if (!EMAIL_PATTERN.test(String(formData.get("email")).trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.get("resume").size > MAX_RESUME_MB * 1024 * 1024) {
      setError(`Resume must be smaller than ${MAX_RESUME_MB} MB.`);
      return;
    }

    formData.append("applicationType", type);
    setSubmitting(true);
    try {
      const response = await fetch("/api/careers", { method: "POST", body: formData });
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
    <form className="career-apply-form" onSubmit={handleSubmit} noValidate>
      <div className="career-apply-grid">
        {fields.map((field) => (
          <div className={`career-apply-field${field.type === "textarea" ? " is-wide" : ""}`} key={field.name}>
            <label htmlFor={`apply-${field.name}`}>
              {field.label}
              {field.required && <span className="contact-required">*</span>}
            </label>
            <FieldInput field={field} />
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

      <button type="submit" className="contact-submit-btn" disabled={submitting}>
        {submitting ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}

function FieldInput({ field }) {
  const props = { id: `apply-${field.name}`, name: field.name, required: field.required };

  if (field.type === "dob") return <DobInput field={field} />;

  if (field.type === "textarea") return <textarea className="contact-textarea" {...props} />;

  if (field.type === "file") {
    return (
      <>
        <input type="file" className="contact-input career-apply-file" accept=".pdf,.doc,.docx" {...props} />
        <small className="career-apply-hint">PDF, DOC or DOCX, up to {MAX_RESUME_MB} MB</small>
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
