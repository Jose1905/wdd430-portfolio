import { Suspense } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="text-2xl font-bold">
        David Vega
      </div>
      <Suspense fallback={<div className="h-6" aria-hidden="true" />}>
        <NavLinks />
      </Suspense>
    </header>
  );
}
