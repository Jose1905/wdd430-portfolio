"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className={pathname === "/about" ? "active" : ""}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathname === "/about" ? "active" : ""}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={pathname === "/about" ? "active" : ""}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={pathname === "/about" ? "active" : ""}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            Contact Information
          </Link>
        </li>
      </ul>
    </nav>
  );
}