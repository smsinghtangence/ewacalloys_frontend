import { NextResponse } from "next/server";
import { normalizeContact, validateContact } from "@/lib/contactValidation";

// Receives the Contact Us form, validates it again (the browser checks can be bypassed) and saves it in
// Strapi as a contact-submission. Strapi validates once more, including that the dropdown answers are
// options from the Contact Page, and emails the admin after saving.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field, bots usually do.
  // Pretend success so bots don't learn to leave it blank.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const values = normalizeContact(body);
  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  try {
    const response = await fetch(`${backendUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: values }),
    });

    if (response.status === 400) {
      // Strapi rejected a field (e.g. a dropdown value that is no longer an option) — show it on that field.
      const payload = await response.json().catch(() => null);
      return NextResponse.json(
        {
          ok: false,
          error: payload?.error?.message || "Please correct the highlighted fields.",
          fieldErrors: payload?.error?.details?.errors ?? {},
        },
        { status: 400 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not submit your message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the server. Please try again later." },
      { status: 502 }
    );
  }
}
