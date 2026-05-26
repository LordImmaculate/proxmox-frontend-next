import { LoginForm } from "./login-form";
import { Logo } from "@/components/logo";
import { H1 } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  if (process.env.ALLOW_SIGN_UP !== "true") {
    return (
      <>
        <Logo className="p-10" />
        <div className="mt-20 flex flex-col items-center gap-10">
          <H1>Sign Up Not Allowed</H1>
          <Link
            className={cn(buttonVariants(), "max-w-xs")}
            href="/auth/signin"
          >
            Sign In
          </Link>
        </div>
      </>
    );
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/mountains.png"
          alt="Image"
          width={500}
          height={500}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
