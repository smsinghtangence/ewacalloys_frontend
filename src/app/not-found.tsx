import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | EWAC",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      {/* See the note in contact-us/page.tsx: padding/gap-instead-of-margin
          used throughout because Tailwind's margin/padding utilities lose to
          main.css's unlayered global reset. */}
      <main className="flex w-full justify-center" style={{ padding: "96px 24px" }}>
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-6xl font-bold text-[#c0392b]">404</p>
          <h1 className="text-3xl font-normal text-[#1a1a1a] sm:text-4xl">Page Not Found</h1>
          <p className="text-lg font-light text-[#7c7c7c]">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
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
