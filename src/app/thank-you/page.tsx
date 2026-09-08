import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | EWAC",
  description: "Thank you for contacting EWAC.",
};

export default function ThankYouPage() {
  return (
    <>
      {/* See the note in contact-us/page.tsx: padding/gap-instead-of-margin
          used throughout because Tailwind's margin/padding utilities lose to
          main.css's unlayered global reset. */}
      <main className="flex w-full justify-center" style={{ padding: "96px 24px" }}>
        <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c0392b]/10"
          >
            <i className="fas fa-check text-2xl text-[#c0392b]" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-normal text-[#1a1a1a] sm:text-4xl">Thank You</h1>
            <p className="text-lg font-light text-[#7c7c7c]">
              Your message has been received. Our team will get back to you shortly.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#c0392b] text-[15px] font-semibold text-white transition hover:bg-[#a93226]"
            style={{ padding: "12px 32px" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
