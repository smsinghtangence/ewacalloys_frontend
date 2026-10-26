import Link from "next/link";

export default function Breadcrumb({ current, trail = [] }) {
  return (
    <nav className="blog-breadcrumb" aria-label="breadcrumb">
      <Link href="/">Home</Link> <span className="sep">&gt;</span>{" "}
      {trail.map((crumb) => (
        <span key={crumb.href}>
          <Link href={crumb.href}>{crumb.label}</Link> <span className="sep">&gt;</span>{" "}
        </span>
      ))}
      <span className="current">{current}</span>
    </nav>
  );
}
