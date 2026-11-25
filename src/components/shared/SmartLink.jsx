import Link from "next/link";

// Internal page paths open with client-side navigation (instant, prefetched, no full reload).
// Everything else — other sites, files (PDF, images), "#", new-tab links — stays a plain <a>.
const isInternalPage = (href) =>
  typeof href === "string" &&
  href.startsWith("/") &&
  !href.startsWith("//") &&
  !href.startsWith("/uploads/") &&
  !href.startsWith("/assets/") &&
  !/\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(href);

export default function SmartLink({ href, newTab = false, children, ...props }) {
  if (!newTab && isInternalPage(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href || "#"} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}
