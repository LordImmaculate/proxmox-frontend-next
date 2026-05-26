"use client";

import { Button } from "@/components/ui/button";
import { VenetianMask } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import PopoverWarning from "@/components/popover-warning";

export default function ClientButtons({
  userId,
  allowImpersonate
}: {
  userId: string;
  allowImpersonate: boolean;
}) {
  const router = useRouter();

  async function handleImpersonate() {
    const promise = authClient.admin.impersonateUser({ userId });
    toast.promise(
      promise.then((result) => {
        if (result.error) throw new Error(result.error.message);
        router.push("/");
        router.refresh();
        return result;
      }),
      {
        loading: "Impersonating user...",
        success: "Now impersonating user!",
        error: (err) => err?.message ?? "Failed to impersonate user"
      }
    );
  }

  async function handleDelete() {
    const promise = authClient.admin.removeUser({ userId });
    toast.promise(
      promise.then((result) => {
        if (result.error) throw new Error(result.error.message);
        router.push("/admin/users");
        router.refresh();
        return result;
      }),
      {
        loading: "Deleting user...",
        success: "User deleted!",
        error: (err) => err?.message ?? "Failed to delete user"
      }
    );
  }

  return (
    <ButtonGroup className="w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            style={{
              opacity: allowImpersonate ? 1 : 0.5
            }}
            className="flex-1"
            onClick={allowImpersonate ? handleImpersonate : undefined}
          >
            <VenetianMask />
            Impersonate
          </Button>
        </TooltipTrigger>
        <TooltipContent className={allowImpersonate ? "hidden" : ""}>
          You can&apos;t impersonate admins.
        </TooltipContent>
      </Tooltip>
      <PopoverWarning action={handleDelete}>
        <Button variant="destructive" className="flex-1" data-slot="button">
          Delete User
        </Button>
      </PopoverWarning>
    </ButtonGroup>
  );
}
