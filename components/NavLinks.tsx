"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinksProps = {
  isLoggedIn: boolean;
  signOutButton: ReactNode;
};

export default function NavLinks({ isLoggedIn, signOutButton }: NavLinksProps) {
  const pathname = usePathname();

  function getLinkState(href: string) {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

    return {
      className: isActive ? "active" : "",
      "aria-current": isActive ? ("page" as const) : undefined,
    };
  }

  return (
    <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
      <ul className="flex gap-6">
        <li>
          <Link href="/" {...getLinkState("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/contact" {...getLinkState("/contact")}>
            Contact Information
          </Link>
        </li>

        {!isLoggedIn && (
          <li>
            <Link href="/projects" {...getLinkState("/projects")}>
              Projects
            </Link>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link href="/login" {...getLinkState("/login")}>
              Log in
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link href="/dashboard/projects" {...getLinkState("/dashboard/projects")}>
              Projects
            </Link>
          </li>
        )}

        {isLoggedIn && <li>{signOutButton}</li>}
      </ul>
    </nav>
  );
}
