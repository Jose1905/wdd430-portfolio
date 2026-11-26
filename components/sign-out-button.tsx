import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Log out
      </button>
    </form>
  );
}
