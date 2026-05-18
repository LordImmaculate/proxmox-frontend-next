"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientButtons() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        }
      }
    });
  }
  return (
    <ButtonGroup className="min-w-full">
      <Button variant="outline">
        <KeyRound />
        Change Password
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <LogOut />
            Sign Out
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32">
          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="w-full"
          >
            Are you sure?
          </Button>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}
