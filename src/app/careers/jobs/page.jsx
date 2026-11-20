import { redirect } from "next/navigation";
import InnerBanner from "@/components/shared/InnerBanner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import { getPageMeta } from "@/lib/seo";

// Title, description and robots come from Strapi → Page SEO (path "/careers/jobs").
export const generateMetadata = () => getPageMeta("/careers/jobs", {
  title: "Apply for a Job",
  description: "Apply to EWAC Alloys as an experienced professional or early-career graduate. Fill in the form and upload your resume to join our team.",
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. THE FIELDS
// Each tab of the form. `name` must match the field name in Strapi → Career Application.
// To add a field: add it here, then add a field with the same name in Strapi's Content-Type Builder.
// `max` = maximum characters.
// ─────────────────────────────────────────────────────────────────────────────
const COMMON_FIELDS = [
  { name: "fullName", label: "Full Name", required: true, max: 100 },
  { name: "email", label: "Personal Email ID", type: "email", required: true, max: 254 },
  { name: "dateOfBirth", label: "Date of Birth", type: "dob", required: true },
  { name: "mobile", label: "Mobile Number", type: "tel", required: true, max: 20 },
];

const FORMS = {
  experienced: {
    tab: "Experienced Professionals",
    fields: [
      ...COMMON_FIELDS,
      { name: "currentCompany", label: "Current Company", required: true, max: 100 },
      { name: "currentDesignation", label: "Current Designation", required: true, max: 100 },
      { name: "totalExperience", label: "Total Experience (Years)", type: "number", required: true },
      { name: "currentLocation", label: "Current Location", required: true, max: 100 },
      { name: "preferredLocation", label: "Preferred Location", required: true, max: 100 },
      { name: "resume", label: "Resume Upload", type: "file", required: true },
      { name: "noticePeriod", label: "Notice Period", max: 50 },
      { name: "expectedCtc", label: "Expected CTC", max: 50 },
    ],
  },
  early: {
    tab: "Early Careers",
    fields: [
      ...COMMON_FIELDS,
      { name: "highestQualification", label: "Highest Qualification", required: true, max: 100 },
      { name: "specialization", label: "Specialization / Branch", required: true, max: 100 },
      { name: "currentLocation", label: "Current Location", required: true, max: 100 },
      { name: "preferredLocation", label: "Preferred Location", required: true, max: 100 },
      { name: "resume", label: "Resume Upload", type: "file", required: true },
      { name: "graduationYear", label: "Year of Graduation", type: "number" },
      { name: "address", label: "Address for Communication", type: "textarea", max: 500 },
    ],
  },
};

// Vercel accepts request bodies up to 4.5 MB, so the resume is capped at 4 MB (the browser checks this too).
const MAX_RESUME_MB = 4;

// ─────────────────────────────────────────────────────────────────────────────
// 2. SENDING THE APPLICATION (runs on the server, never in the browser)
// When the visitor clicks Submit, the fields and the resume go to Strapi in ONE request:
//   POST /api/career-applications   (multipart: applicationType, fullName, …, resume)
// Strapi's career-application controller (ewacalloys_backend/src/api/career-application) then
// checks every field, uploads the resume, saves the application and emails HR. No API token needed.
//   ✓ saved          → the visitor goes to /thank-you
//   ✗ wrong fields   → Strapi sends { fieldName: "message" } and each message shows under its input
// ─────────────────────────────────────────────────────────────────────────────
async function submitApplication(previousState, formData) {
  "use server";

  // Honeypot: a hidden field real visitors leave empty. Bots fill it, so pretend success and stop.
  if (formData.get("company")) redirect("/thank-you");

  const type = formData.get("applicationType");
  const form = FORMS[type];
  if (!form) return { error: "Unknown application type." };

  const resume = formData.get("resume");
  if (resume?.size > MAX_RESUME_MB * 1024 * 1024) {
    const message = `Resume must be smaller than ${MAX_RESUME_MB} MB.`;
    return { error: message, fieldErrors: { resume: message } };
  }

  // Only the chosen tab's fields are sent.
  const body = new FormData();
  body.append("applicationType", type);
  for (const field of form.fields) {
    const value = formData.get(field.name);
    if (field.type === "file") {
      if (value?.size) body.append(field.name, value, value.name);
    } else {
      body.append(field.name, String(value ?? "").trim());
    }
  }

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
    const response = await fetch(`${strapiUrl}/api/career-applications`, { method: "POST", body });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      // The real reason, in the terminal running Next.js (npm run dev / server logs).
      console.error("Career application rejected by Strapi:", response.status, JSON.stringify(payload?.error));
      if (response.status !== 400) return { error: "Could not submit your application. Please try again later." };
      const fieldErrors = payload?.error?.details?.errors ?? {};
      return {
        error: Object.values(fieldErrors)[0] || payload?.error?.message || "Please check your details.",
        fieldErrors,
      };
    }
  } catch (error) {
    console.error("Career application failed:", error);
    return { error: "Could not reach the server. Please try again later." };
  }

  redirect("/thank-you");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. THE PAGE
// ?type=experienced or ?type=early (from the Careers page cards) opens that tab.
// ─────────────────────────────────────────────────────────────────────────────
export default async function CareerJobsPage({ searchParams }) {
  const { type } = await searchParams;

  return (
    <>
      <InnerBanner
        src="/assets/images/life/life-banner.webp"
        mobileSrc="/assets/images/life/life-banner-mobile.webp"
        alt="EWAC colleagues at work"
        className="blog-page-banner"
      />

      <section className="blog-toolbar">
        <div className="container">
          <Breadcrumb current="Apply" trail={[{ label: "Careers", href: "/careers" }]} />
        </div>
      </section>

      <section className="career-apply-section">
        <div className="container">
          <div className="career-apply-heading">
            <p className="careers-eyebrow">Take the next step</p>
            <h1>Apply to EWAC</h1>
            <p>
              Choose your career path, fill in your details and upload your resume. Fields marked * are required.
            </p>
          </div>

          <CareerApplicationForm
            forms={FORMS}
            initialType={type}
            maxResumeMb={MAX_RESUME_MB}
            action={submitApplication}
          />
        </div>
      </section>
    </>
  );
}
