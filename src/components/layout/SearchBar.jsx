"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Search panel that slides down under the header. Submitting opens /search?q=... */
export default function SearchBar({ open, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  // focus the field when the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // close after navigating to another page
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const submit = (event) => {
    event.preventDefault();
    const text = query.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(text)}`);
    onClose();
  };

  return (
    <div className={`site-search${open ? " is-open" : ""}`} role="search" aria-hidden={!open}>
      <form className="site-search-form" onSubmit={submit}>
        <svg className="site-search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, industries, blogs and pages"
          aria-label="Search the site"
          autoComplete="off"
        />
        <button type="submit" className="site-search-go">
          Search
        </button>
        <button type="button" className="site-search-close" aria-label="Close search" onClick={onClose}>
          &times;
        </button>
      </form>
    </div>
  );
}
