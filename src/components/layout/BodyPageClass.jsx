"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function toPageClass(pathname) {
  const routeName = pathname
    .split("/")
    .filter(Boolean)
    .join("-")
    .replace(/[^a-zA-Z0-9_-]/g, "-");

  return `page-${routeName || "home"}`;
}

export default function BodyPageClass() {
  const pathname = usePathname();
  const previousClass = useRef(null);

  useEffect(() => {
    const nextClass = toPageClass(pathname);
    if (previousClass.current) document.body.classList.remove(previousClass.current);
    document.body.classList.add(nextClass);
    previousClass.current = nextClass;

    return () => document.body.classList.remove(nextClass);
  }, [pathname]);

  return null;
}
