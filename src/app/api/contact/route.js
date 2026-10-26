import { NextResponse } from "next/server";



const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const phone = body.phone?.trim();
  const country = body.country?.trim();
  const interestedIn = body.interestedIn?.trim();

  if (!name || !email || !phone || !country || !interestedIn || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, email, country, interested-in, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  try {
    const response = await fetch(`${backendUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { name, email, phone, country, interestedIn, message } }),
    });

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
