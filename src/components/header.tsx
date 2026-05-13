import { headers } from "next/headers";
import { Logo } from "./logo";
import { auth } from "@/lib/auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (
    <header className="flex w-full flex-row p-4">
      <Link href="/">
        <Logo />
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <Link
            href="/vm/create"
            className={buttonVariants({ variant: "outline" })}
          >
            Create VM
          </Link>
        ) : (
          <a
            href="/auth/signin"
            className={buttonVariants({ variant: "outline" })}
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
