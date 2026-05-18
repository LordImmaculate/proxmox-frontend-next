import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { checkSession } from "@/lib/utils-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./profile-form";

export default async function Page() {
  const session = await checkSession();
  if (!session.success) redirect("/auth/signin");

  async function signOut() {
    "use server";
    console.log("Signing out...");
    await auth.api.signOut({ headers: await headers() });
    redirect("/auth/signin");
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-lg p-6 sm:border sm:bg-popover">
        <EditProfileForm name={session.user.name} email={session.user.email} />
        <form action={signOut}>
          <Button type="submit" className="ml-4">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
