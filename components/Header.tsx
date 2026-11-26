import { Suspense } from "react";
import { connection } from "next/server";
import { auth } from "@/auth";
import NavLinks from "./NavLinks";
import { SignOutButton } from "./sign-out-button";

async function SessionNavLinks() {
  await connection();
  const session = await auth();

  return (
    <NavLinks
      isLoggedIn={Boolean(session?.user)}
      signOutButton={session?.user ? <SignOutButton /> : null}
    />
  );
}

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="text-2xl font-bold">
        David Vega
      </div>
      <Suspense fallback={<div className="h-6" aria-hidden="true" />}>
        <SessionNavLinks />
      </Suspense>
    </header>
  );
}
