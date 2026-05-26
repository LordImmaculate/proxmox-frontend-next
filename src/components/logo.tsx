import { cn } from "@/lib/utils";
import { Cloud } from "lucide-react";

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(`flex justify-center gap-2 md:justify-start`, className)}
      {...props}
    >
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Cloud className="size-4" />
      </div>
      TI-ICT VMs
    </div>
  );
}
