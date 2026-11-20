import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Receives the footer's "sign up for updates" form and saves the email in Strapi → Newsletter Subscriber.
// Strapi validates again and ignores duplicates, so the same email can be sent twice safely.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field, bots usually do. Pretend success.
  if (body.honeypot) return NextResponse.json({ ok: true });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  const sourcePage = String(body.sourcePage ?? "").slice(0, 255);

  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  try {
    const response = await fetch(`${backendUrl}/api/newsletter-subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { email, sourcePage } }),
    });

    if (response.status === 400) {
      const payload = await response.json().catch(() => null);
      return NextResponse.json(
        { ok: false, error: payload?.error?.message || "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "Could not sign you up. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not reach the server. Please try again later." }, { status: 502 });
  }
}
