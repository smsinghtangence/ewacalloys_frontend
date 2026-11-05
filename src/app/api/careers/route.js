import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = [".pdf", ".doc", ".docx"];

// Required fields for each form on /careers/jobs (the resume is checked separately).
const REQUIRED = {
  experienced: [
    "fullName", "email", "dateOfBirth", "mobile", "currentCompany", "currentDesignation",
    "totalExperience", "currentLocation", "preferredLocation",
  ],
  early: [
    "fullName", "email", "dateOfBirth", "mobile", "highestQualification", "specialization",
    "currentLocation", "preferredLocation",
  ],
};

const OPTIONAL = {
  experienced: ["noticePeriod", "expectedCtc"],
  early: ["graduationYear", "address"],
};

const fail = (error, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid request body.");
  }

  // Honeypot: real users never fill this hidden field, bots usually do.
  // Pretend success so bots don't learn to leave it blank.
  if (form.get("company")) {
    return NextResponse.json({ ok: true });
  }

  const applicationType = form.get("applicationType");
  if (!REQUIRED[applicationType]) return fail("Unknown application type.");

  const data = { applicationType };
  for (const name of [...REQUIRED[applicationType], ...OPTIONAL[applicationType]]) {
    data[name] = String(form.get(name) ?? "").trim();
  }

  if (REQUIRED[applicationType].some((name) => !data[name])) return fail("Please fill in all required fields.");
  if (!EMAIL_PATTERN.test(data.email)) return fail("Please enter a valid email address.");

  const resume = form.get("resume");
  if (!resume?.size) return fail("Please upload your resume.");
  if (resume.size > MAX_RESUME_BYTES) return fail("Resume must be smaller than 5 MB.");
  if (!RESUME_TYPES.some((ext) => resume.name.toLowerCase().endsWith(ext))) {
    return fail("Resume must be a PDF, DOC or DOCX file.");
  }

  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  try {
    // 1. Upload the resume to the Strapi media library.
    const upload = new FormData();
    upload.append("files", resume, resume.name);
    const uploadResponse = await fetch(`${backendUrl}/api/upload`, { method: "POST", body: upload });
    if (!uploadResponse.ok) return fail("Could not upload your resume. Please try again later.", 502);
    const [uploaded] = await uploadResponse.json();

    // 2. Save the application with the uploaded resume attached.
    const response = await fetch(`${backendUrl}/api/career-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...data, resume: uploaded.id } }),
    });
    if (!response.ok) return fail("Could not submit your application. Please try again later.", 502);

    return NextResponse.json({ ok: true });
  } catch {
    return fail("Could not reach the server. Please try again later.", 502);
  }
}
