import Link from "next/link";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="blog-breadcrumb" aria-label="breadcrumb">
      <Link href="/">Home</Link> <span className="sep">&gt;</span>{" "}
      <span className="current">{current}</span>
    </nav>
  );
}
