"use client";

import type { auth } from "@/lib/auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function HeaderContents({
  session
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) {
  const t = useTranslations("nav");

  return (
    <>
      {session?.user ? (
        <>
          <Link
            href="/vms/create"
            className={buttonVariants({ variant: "outline" })}
          >
            {t("create_vm")}
          </Link>
          <Link
            href="/profile"
            className={buttonVariants({ variant: "outline" })}
          >
            {t("profile")}
          </Link>
        </>
      ) : (
        <Link
          href="/auth/signin"
          className={buttonVariants({ variant: "outline" })}
        >
          {t("sign_in")}
        </Link>
      )}
      {session?.user.role === "admin" && (
        <Link href="/admin" className={buttonVariants({ variant: "outline" })}>
          {t("admin")}
        </Link>
      )}
    </>
  );
}
