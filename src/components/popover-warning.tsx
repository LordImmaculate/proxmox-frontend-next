import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import type { Popover as PopoverPrimitive } from "@base-ui/react";
import * as React from "react";

export default function PopoverWarning({
  children,
  action,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactElement;
  action: () => void;
}) {
  return (
    <Popover {...props}>
      <PopoverTrigger render={children} />
      <PopoverContent className="w-32">
        <Button variant="destructive" onClick={action} className="w-full">
          Are you sure?
        </Button>
      </PopoverContent>
    </Popover>
  );
}
